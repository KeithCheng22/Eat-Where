<template>
        <section role="status" class="max-[699px]:space-y-3 animate-pulse border-2 border-white min-[700px]:flex lg:justify-center p-5 gap-5 rounded-[26px] mb-3 shadow-lg cursor-wait">
            
        <div class="flex items-center justify-center h-[150px] sm:h-[250px] bg-gray-300 rounded-md  min-[1024px]:aspect-square min-[1024px]:h-[150px] w-fit">
            <svg class="w-[250px] h-10 text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"/>
            </svg>
        </div>

        <div class="w-full flex flex-col max-[699px]:mt-3">
            <div class="h-7 bg-gray-200 rounded-xl w-48 mb-2"></div> 
            <hr class="my-3">
            <div class="h-3 w-[50%] bg-gray-200 rounded-md max-w-[480px] mb-2.5"></div>
            <div class="h-3 w-[50%] bg-gray-200 rounded-md mb-2.5"></div>
            <div class="h-3 bg-gray-200 rounded-md max-w-[440px] mb-2.5"></div>

            <div class="h-2 bg-gray-200 rounded-md max-w-[460px] mb-2.5 w-[25%]"></div>
            <div class="h-3 bg-gray-200 rounded-md max-w-[360px] w-[50%] mt-auto"></div>
        </div>
    </section>

</template>
