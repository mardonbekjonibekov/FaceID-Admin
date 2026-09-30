import Link from "next/link";

const NotFoundPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-page-bg px-5">
      <div className="w-full max-w-112.5 rounded-card bg-white px-5 py-7.5 text-center">
        <p className="text-[40px] leading-none font-bold text-brand">404</p>
        <h1 className="mt-2 text-[20px] font-semibold">Sahifa topilmadi</h1>
        <p className="mt-1 text-[16px] text-ink/60">
          Bu sahifa mavjud emas yoki ko’chirilgan.
        </p>
        <Link
          href="/students"
          className="mt-6.25 inline-flex h-11 w-full items-center justify-center rounded-field bg-brand text-[16px] text-white"
        >
          Bosh sahifaga qaytish
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
