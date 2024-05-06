<template>
    <section class="border-2 border-white min-[700px]:flex lg:justify-center p-5 gap-5 rounded-[26px] mb-3 shadow-lg max-[700px]:w-[70%] max-[700px]:mx-auto">
        <img :src="image_url" class="max-[700px]:aspect-[16/12] aspect-square max-sm:max-w-[200px] sm:max-w-[250px] rounded-lg object-cover object-center" :alt="name"/>

        <div class="font-poppins text-white tracking-wider flex flex-col max-[699px]:mt-3 w-fit">
            <h2 class="font-semibold font-montserrat mb-2 max-[699px]:mb-0 max-sm:text-[1.5rem] sm:text-[1rem]">{{ name }}</h2>
            <hr class="my-3">
            <p>Rating: {{ rating || '-' }} / 5</p>
            <p>Price: {{ price || '-' }}</p>

            <div class="flex flex-col">
                <p class="text-wrap">Location: {{ location || '-'}}</p>
                <small class="text-slate-200">{{ (distance/1000).toFixed(2) || '-' }}km</small>
            </div>

            <a :href="url" target='_blank' class="font-semibold mt-auto max-[699px]:mt-3 info">More info</a>
        </div>
    </section>
    
</template>

<script setup>
    const props = defineProps({
        name: String,
        image_url: String,
        url: String,
        rating: Number,
        price: String,
        location: String,
        distance: Number,
    })

</script>