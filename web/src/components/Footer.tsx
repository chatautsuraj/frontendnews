import Link from "next/link";
import { site } from "@/data/mock";
import { Logo } from "./Logo";

const linkGroups = [
  {
    title: "Advertise with Kalopati",
    items: [
      "Ad Board Reg. : 0642/2082/83/01",
      `Email : ${site.email}`,
      `Contact : ${site.phone}`,
      "Advertisement Tariff",
    ],
  },
  {
    title: "कालोपाटी लिंक्स",
    items: ["हाम्रो बारेमा", "सम्पर्क", "गोपनीयता नीति", "सम्पादकीय नीति", "विज्ञापन नीति"],
  },
  {
    title: "कालोपाटी इन्फोलाइन",
    items: ["निर्देशक", "मल्टिमिडिया संयोजक", "प्रधान सम्पादक", "समाचार संयोजक"],
  },
  {
    title: "थप जानकारी",
    items: ["जेन-जी सहिद सूची", "API Documentation", "प्रेस काउन्सिल दर्ता"],
  },
];

export function Footer() {
  return (
    <footer className="bg-primary text-white mt-10">
      <div className="bg-secondary border-b border-gray-400">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 bg-primary px-4 py-3 w-full lg:[clip-path:polygon(0%_0%,100%_0,95%_100%,0%_100%)]">
            <span className="text-sm font-semibold">एप डाउनलोड गर्नुहोस्</span>
            <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
              <span className="inline-flex items-center gap-2 rounded-xl bg-black px-4 py-2">
                Google Play
              </span>
              <span className="inline-flex items-center gap-2 rounded-xl bg-black px-4 py-2">
                App Store
              </span>
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 px-4 py-3 w-full">
            <span className="text-sm font-semibold">सञ्जालमा फलो गर्नुहोस्</span>
            {["f", "x", "tt", "yt", "ig"].map((label) => (
              <span
                key={label}
                className="inline-flex items-center justify-center w-10 h-10 rounded-md bg-black uppercase text-xs font-bold"
              >
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center gap-2 py-6 relative">
        <Logo variant="footer" />
        <span className="absolute -bottom-1 left-0 right-0 mx-auto w-full md:w-64 h-1 bg-gradient-to-r from-transparent via-white to-transparent" />
      </div>

      <div className="container-xl px-4 pb-8 pt-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {linkGroups.map((group) => (
            <div key={group.title}>
              <h3 className="font-display text-xl font-bold mb-3">{group.title}</h3>
              <ul className="space-y-2 text-sm text-white/85">
                {group.items.map((item) => (
                  <li key={item}>
                    <Link href="#" className="hover:text-white transition">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-md bg-ternary px-4 py-3 text-sm md:text-base">
          <strong>सिधा सम्पर्क:</strong> {site.phone} · {site.email}
        </div>
      </div>

      <div className="border-t border-white/10 text-xs md:text-sm text-white/70">
        <div className="container-xl px-4 py-3 flex flex-col md:flex-row justify-between gap-2 text-center md:text-left">
          <span>Copyright {new Date().getFullYear()} @ {site.nameEn}.com | All rights reserved</span>
          <span>Frontend clone for demo — API wiring next</span>
        </div>
      </div>
    </footer>
  );
}
