import Link from 'next/link';

export default function SiteFooter() {
  return (
    <footer className="border-t border-white/10 py-10 px-6">
      <div className="max-w-[1160px] mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <p className="text-white font-semibold">
            ANVL<span className="text-[#E4312D]">.</span>
          </p>
          <p className="text-sm text-[#AAB1B9] mt-1">
            SaaS risk-tech & programmable collateral infrastructure for floorplan lenders.
          </p>
        </div>

        <div className="flex gap-6 text-sm">
          <Link href="/roadmap" className="text-[#AAB1B9] hover:text-white transition-colors">Roadmap</Link>
          <Link href="/team" className="text-[#AAB1B9] hover:text-white transition-colors">Team</Link>
          <Link href="/faq" className="text-[#AAB1B9] hover:text-white transition-colors">FAQ</Link>
          <Link href="/contact" className="text-[#AAB1B9] hover:text-white transition-colors">Contact</Link>
        </div>

        <p className="text-xs text-[#AAB1B9]">© {new Date().getFullYear()} ANVL Finance LLC. All rights reserved.</p>
      </div>
    </footer>
  );
}