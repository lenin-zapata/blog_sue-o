export default function AdBanner({ value }: any) {
  if (!value?.url) return null;

  return (
    <a 
      href={value.url} 
      target="_blank" 
      rel="nofollow"
      className="block my-10 group no-underline"
    >
      <div className="bg-white border-l-4 border-[#8E6E77] p-6 shadow-md hover:shadow-lg transition-all">
        <div className="flex justify-between items-center">
          <div>
            <h4 className="font-serif text-xl text-[#8E6E77] font-bold group-hover:underline">
              ¿Necesitas ayuda extra?
            </h4>
            <p className="text-gray-600 mt-1">
              {value.info || "Haz clic aquí para ver nuestra recomendación del día."}
            </p>
          </div>
          <span className="text-2xl text-[#8E6E77]">➔</span>
        </div>
      </div>
    </a>
  );
}