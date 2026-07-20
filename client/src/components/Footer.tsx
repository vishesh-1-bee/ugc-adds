import { Sparkles, Twitter, Instagram, Youtube, Linkedin, Mail, MapPin } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const footerLinks = {
  Product: [
    { label: 'Features', href: '#features' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'How It Works', href: '#workflow' },
    { label: 'API Docs', href: '#' },
    { label: 'Changelog', href: '#' },
  ],
  Company: [
    { label: 'About Us', href: '#' },
    { label: 'Blog', href: '#' },
    { label: 'Careers', href: '#' },
    { label: 'Press Kit', href: '#' },
    { label: 'Contact', href: '#' },
  ],
  Legal: [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
    { label: 'Cookie Policy', href: '#' },
    { label: 'GDPR', href: '#' },
  ],
};

const socialLinks = [
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Youtube, href: '#', label: 'YouTube' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
];

export default function Footer() {
  const { isDark } = useTheme();

  return (
    <footer
      id="footer"
      className="relative pt-16 pb-8"
      style={{
        borderTop: isDark
          ? '1px solid rgba(42, 42, 66, 0.5)'
          : '1px solid rgba(232, 230, 240, 0.6)',
      }}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Top section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <a href="#" className="flex items-center gap-2 mb-4 group">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, #9b82ff, #ff6090)',
                }}
              >
                <Sparkles size={18} className="text-white" />
              </div>
              <span
                className="text-xl font-bold font-display"
                style={{ color: isDark ? '#e8e6f0' : '#1e1e2e' }}
              >
                Ad<span className="text-gradient">Genix</span>
              </span>
            </a>
            <p
              className="text-sm leading-relaxed mb-6 max-w-sm"
              style={{ color: isDark ? '#a8a6b8' : '#64627a' }}
            >
              Create scroll-stopping UGC video ads in seconds with AI. No
              cameras, no editors, no hassle — just results that convert.
            </p>

            {/* Contact info */}
            <div className="space-y-2 mb-6">
              <div className="flex items-center gap-2">
                <Mail size={14} style={{ color: isDark ? '#6e6c82' : '#9896a8' }} />
                <a
                  href="mailto:hello@adgenix.ai"
                  className="text-sm transition-colors duration-200 hover:text-lavender-500"
                  style={{ color: isDark ? '#a8a6b8' : '#64627a' }}
                >
                  hello@adgenix.ai
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={14} style={{ color: isDark ? '#6e6c82' : '#9896a8' }} />
                <span
                  className="text-sm"
                  style={{ color: isDark ? '#a8a6b8' : '#64627a' }}
                >
                  San Francisco, CA
                </span>
              </div>
            </div>

            {/* Social icons */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110"
                  style={{
                    background: isDark
                      ? 'rgba(155, 130, 255, 0.1)'
                      : 'rgba(155, 130, 255, 0.06)',
                    border: '1px solid rgba(155, 130, 255, 0.1)',
                    color: isDark ? '#a8a6b8' : '#64627a',
                  }}
                >
                  <social.icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4
                className="font-display font-semibold text-sm mb-4 tracking-wider uppercase"
                style={{ color: isDark ? '#e8e6f0' : '#1e1e2e' }}
              >
                {title}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm transition-colors duration-200 hover:text-lavender-500"
                      style={{ color: isDark ? '#a8a6b8' : '#64627a' }}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div
          className="h-px mb-8"
          style={{
            background: isDark
              ? 'rgba(42, 42, 66, 0.5)'
              : 'rgba(232, 230, 240, 0.6)',
          }}
        />

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p
            className="text-xs"
            style={{ color: isDark ? '#6e6c82' : '#9896a8' }}
          >
            © {new Date().getFullYear()} AdGenix. All rights reserved.
          </p>
          <p
            className="text-xs"
            style={{ color: isDark ? '#6e6c82' : '#9896a8' }}
          >
            Made with ✨ and AI
          </p>
        </div>
      </div>
    </footer>
  );
}
