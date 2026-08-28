import { render, screen } from '@testing-library/react';
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
