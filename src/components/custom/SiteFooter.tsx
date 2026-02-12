import Image from 'next/image';
import Link from 'next/link';
import { Linkedin, Mail } from 'lucide-react';

export default function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-[#0D1B2A]">
      <div className="max-w-[1160px] mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          {/* Left: Copyright */}
          <div className="text-sm text-[#AAB1B9]">
            © {new Date().getFullYear()} ANVL. All rights reserved.
          </div>

          {/* Middle: Built on Vara */}
          <a
            href="https://vara.network/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 text-sm text-[#AAB1B9] hover:text-white transition-colors"
            aria-label="Built on Vara"
          >
            <span>Built on</span>
            <Image
              src="/vara-logo-white.png"
              alt="Vara Network"
              width={90}
              height={24}
              priority={false}
            />
          </a>

          {/* Right: Socials */}
          <div className="flex items-center gap-4">
            <a
              href="https://www.linkedin.com/company/anvl-labs/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#AAB1B9] hover:text-white transition-colors"
              aria-label="ANVL on LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </a>

            <a
              href="mailto:info@anvl.ai"
              className="text-[#AAB1B9] hover:text-white transition-colors"
              aria-label="Email ANVL"
            >
              <Mail className="h-5 w-5" />
            </a>

            <Link
              href="/contact"
              className="text-sm text-[#E4312D] hover:underline"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}