import { ShoppingBag } from "lucide-react";

export function Empty({
  title,
  copy,
  href,
  action,
}: {
  title: string;
  copy: string;
  href: string;
  action: string;
}) {
  return (
    <div className="min-h-[420px] flex flex-col items-center justify-center text-center p-[32px] max-w-[400px] mx-auto">
      <ShoppingBag className="w-[48px] h-[48px] stroke-[1] text-stone mb-6" />
      <h2 className="m-0 mb-4">{title}</h2>
      <p className="text-stone text-[16px] mb-8">{copy}</p>
      <a className="btn-primary" href={href}>
        {action}
      </a>
    </div>
  );
}
