import Image from 'next/image';
import Link from 'next/link';
import {
  Linkedin,
  Mail,
  Twitter,
  Github,
  Rss,
  Music2,
} from 'lucide-react';

export default function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-background">
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
          <div className="flex items-center gap-4 flex-wrap">
            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/company/anvl-labs/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#AAB1B9] hover:text-white transition-colors"
              aria-label="ANVL on LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </a>

            {/* X (Twitter) */}
            <a
              href="https://x.com/anvl_labs"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#AAB1B9] hover:text-white transition-colors"
              aria-label="ANVL on X"
            >
              <Twitter className="h-5 w-5" />
            </a>

            {/* TikTok */}
            <a
              href="https://www.tiktok.com/@anvl.finance"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#AAB1B9] hover:text-white transition-colors"
              aria-label="ANVL on TikTok"
            >
              <Music2 className="h-5 w-5" />
            </a>

            {/* Substack */}
            <a
              href="https://substack.com/@anvlfinance"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#AAB1B9] hover:text-white transition-colors"
              aria-label="ANVL on Substack"
            >
              <Rss className="h-5 w-5" />
            </a>

            {/* GitHub */}
            <a
              href="https://github.com/anvlfinance"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#AAB1B9] hover:text-white transition-colors"
              aria-label="ANVL on GitHub"
            >
              <Github className="h-5 w-5" />
            </a>

            {/* Email */}
            <a
              href="mailto:info@anvl.ai"
              className="text-[#AAB1B9] hover:text-white transition-colors"
              aria-label="Email ANVL"
            >
              <Mail className="h-5 w-5" />
            </a>

            {/* Contact Page */}
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