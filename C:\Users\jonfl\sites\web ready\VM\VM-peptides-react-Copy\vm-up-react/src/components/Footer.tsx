export function Footer() {
  return (
    <footer
      className="py-12 px-6"
      style={{
        background: '#111111',
        borderTop: '1px solid #2a2a2a',
      }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-7 h-7 flex items-center justify-center rounded"
                style={{ border: '1px solid #c47830' }}
              >
                <img src="/brand-assets/VM-logo.png" alt="VM" className="w-4 h-4 object-contain" />
              </div>
              <span className="text-sm font-semibold" style={{ color: '#f2f1ef' }}>VM Peptides</span>
            </div>
            <p className="text-xs leading-relaxed" style={{ color: '#555555', maxWidth: 300, lineHeight: 1.7 }}>
              Supplying research-grade peptides to licensed researchers since 2021.
              All products manufactured in FDA-registered facilities.
            </p>
          </div>

          {[
            {
              heading: 'Products',
              links: ['Healing Peptides', 'GH Peptides', 'Nootropic Peptides', 'Longevity Peptides'],
            },
            {
              heading: 'Company',
              links: ['About', 'Research', 'FAQ', 'Contact'],
            },
          ].map((col) => (
            <div key={col.heading}>
              <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: '#888888' }}>
                {col.heading}
              </p>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-xs focus:outline-none focus-visible:underline"
                      style={{ color: '#555555', transition: 'color 0.15s' }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = '#f2f1ef')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = '#555555')}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div
          className="pt-6 flex flex-col md:flex-row justify-between gap-3 text-xs"
          style={{ borderTop: '1px solid #2a2a2a', color: '#555555' }}
        >
          <p>© {new Date().getFullYear()} VM Peptides. All rights reserved.</p>
          <p>For research and laboratory use only. Not for human consumption.</p>
        </div>
      </div>
    </footer>
  );
}
