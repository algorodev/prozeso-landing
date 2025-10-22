import React from "react";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="w-full border-t">
      <div className="mx-auto max-w-screen-2xl px-3 sm:px-4 py-6">
        <p className="text-center text-sm text-muted-foreground">
          © {year} Prozeso. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
