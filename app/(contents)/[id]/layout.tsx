import { Suspense } from "react";

export default function ContentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Suspense>{children}</Suspense>
    </div>
  );
}
