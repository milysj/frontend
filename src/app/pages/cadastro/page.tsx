import Cadastrar from "@/app/components/Cadastro"; // Importa o componente de cadastro
import Script from "next/script";

export default function Home() {
    return (
        <>
        <Script id="microsoft-clarity" strategy="afterInteractive">
                {`
                    (function(c,l,a,r,i,t,y){
                        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
                    })(window, document, "clarity", "script", "tvolq13xii");
                `}
            </Script>
        
            {/* ===========================
          Container principal da página
          =========================== */}
            <div className="flex min-h-screen flex-col transition-all duration-300 justify-space-between bg-gray-50">

                {/* Componente de cadastro */}
                <Cadastrar/>
            </div>
        </>

        
    );
}
