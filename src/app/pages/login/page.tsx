import Login from "@/app/components/Login"; // Componente de login do usuário

export default function Home() {
    return (
        <>
        <head>
            <script type="text/javascript">
    (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "tvolq13xii");
</script>
        </head>
            {/* ===========================
          Container principal da página
          =========================== */}
            <div className="flex min-h-screen flex-col transition-all duration-300 justify-space-between bg-gray-50">

                {/* Componente de login */}
                <Login/>

            </div>
        </>

        
    );
}
