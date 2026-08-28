import { render, screen } from '@testing-library/react';
import colors from 'tailwindcss/colors';
import App from './App';
import Hero from './components/Hero';
import Data from './data';

describe('App', () => {
  test('renders the name from data.js', () => {
    render(<App />);
    expect(screen.getByText(Data.header.name)).toBeInTheDocument();
    expect(screen.getByText(Data.header.surname)).toBeInTheDocument();
  });

  test('renders the bio and the copyright line', () => {
    render(<App />);
    expect(screen.getByText(Data.content.description)).toBeInTheDocument();
    expect(screen.getByText(Data.footer.copyright)).toBeInTheDocument();
  });

  test('renders every social link with an accessible name and an external-safe target', () => {
    render(<App />);
    Data.social.forEach((social) => {
      // Exactly one match proves the name is not announced twice by both the
      // sr-only span and the icon's alt text.
      const link = screen.getByRole('link', { name: social.name });
      expect(link).toHaveAttribute('href', social.url);
      expect(link).toHaveAttribute('rel', expect.stringContaining('noopener'));
      expect(link.querySelector('img')).toHaveAttribute('src', social.icon);
    });
  });

  test('every image source is a root-absolute path', () => {
    const { container } = render(<App />);
    const images = [...container.querySelectorAll('img')];
    expect(images.length).toBe(Data.social.length + 1); // social icons + avatar
    images.forEach((img) => {
      expect(img.getAttribute('src')).toMatch(/^\//);
    });
  });
});

describe('landmarks', () => {
  test('exposes main, contentinfo and a named navigation landmark', () => {
    render(<App />);
    expect(screen.getByRole('main')).toBeInTheDocument();
    // <footer> only counts as contentinfo while it is not nested inside main,
    // so this also pins down where the footer sits in the tree.
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    expect(screen.getByRole('navigation', { name: 'Social profiles' })).toBeInTheDocument();
  });

  test('groups the social links into a real list', () => {
    render(<App />);
    expect(screen.getAllByRole('listitem')).toHaveLength(Data.social.length);
  });

  test('names the avatar and reserves a square box for it before it loads', () => {
    render(<App />);
    const avatar = screen.getByRole('img', {
      name: `${Data.header.name} ${Data.header.surname}`,
    });
    expect(avatar).toHaveAttribute('src', Data.header.avatar);
    const width = avatar.getAttribute('width');
    const height = avatar.getAttribute('height');
    expect(Number(width)).toBeGreaterThan(0);
    expect(height).toBe(width); // square, matching the rounded-full crop
  });
});

describe('Hero skills', () => {
  const renderSkills = (skills) => {
    const { container } = render(
      <Hero name="a" surname="b" avatar="/img/a.webp" description="d" skills={skills} />
    );
    // The skills row is the last child of the inner container.
    return container.querySelector('.flex-wrap');
  };

  test('omits level "0" skills instead of rendering hidden empty nodes', () => {
    const skills = [
      { name: 'Shown', level: '5' },
      { name: 'Hidden', level: '0' },
    ];
    const row = renderSkills(skills);
    expect(row).toHaveTextContent('Shown');
    expect(row).not.toHaveTextContent('Hidden');
    expect(row.children).toHaveLength(1);
  });

  test('orders skills by descending level', () => {
    const skills = [
      { name: 'Low', level: '1' },
      { name: 'High', level: '5' },
      { name: 'Mid', level: '3' },
    ];
    const row = renderSkills(skills);
    expect([...row.children].map((el) => el.textContent)).toEqual(['#High', '#Mid', '#Low']);
  });

  test('does not mutate the skills array it is given', () => {
    const skills = [
      { name: 'Low', level: '1' },
      { name: 'High', level: '5' },
    ];
    const original = [...skills];
    renderSkills(skills);
    expect(skills).toEqual(original);
  });

  test('renders real data without React key warnings', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation(() => {});
    render(<App />);
    expect(spy).not.toHaveBeenCalled();
    spy.mockRestore();
  });
});

describe('skill legibility', () => {
  // WCAG 2.1 relative luminance, so the test measures the property that matters
  // rather than restating whichever gray the component happens to name.
  const channel = (value) => {
    const c = value / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  };
  const contrastWithWhite = (hex) => {
    const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));
    const luminance = 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
    return 1.05 / (luminance + 0.05);
  };

  test('the luminance helper agrees with known reference ratios', () => {
    expect(contrastWithWhite('#000000')).toBeCloseTo(21, 1);
    expect(contrastWithWhite('#ffffff')).toBeCloseTo(1, 5);
    expect(contrastWithWhite('#767676')).toBeCloseTo(4.54, 1); // the classic 4.5:1 boundary
  });

  test('every visible skill level clears 4.5:1 against the white page', () => {
    const levels = ['1', '2', '3', '4', '5'];
    const { container } = render(
      <Hero
        name="a"
        surname="b"
        avatar="/img/a.webp"
        description="d"
        skills={levels.map((level) => ({ name: `skill-${level}`, level }))}
      />
    );
    const rendered = [...container.querySelectorAll('.flex-wrap > div')];
    expect(rendered).toHaveLength(levels.length);

    rendered.forEach((el) => {
      const shade = el.className.match(/^text-gray-(\d+)$/);
      expect(shade).not.toBeNull();
      expect(contrastWithWhite(colors.gray[shade[1]])).toBeGreaterThanOrEqual(4.5);
    });
  });
});
