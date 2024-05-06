<template>
    <div v-if='!isLoading' class="py-10 px-6 max-w-[1000px]">
        <Button class="" @click="backButtonClicked" title="Back to form"/>
        <img v-show='reccos.length <= 0' src="../assets/notfound.png" alt="Man puzzled with food" />
        <h1 class="font-montserrat text-white text-[2rem] font-bold mb-3 tracking-wider text-center max-[699px]:text-[1.2rem]">{{ reccos.length === 0 ? 'No recommendations available' : 'Here are the reccos!'}}</h1>
        <p v-show='reccos.length <= 0' class="text-center text-white font-poppins">Try adjusting the radius?</p>
        <div class="lg:grid grid-cols-2 gap-3 flex flex-col">
            <FoodCard v-for="recco in reccos" :key="recco.id" :name="recco.name" :image_url="recco.image_url" :url="recco.url" :rating="recco.rating" :price="recco.price" :location="recco.location.address1" :distance="recco.distance"/>
        </div>
        
        <div class="mt-2">
          <button @click="topFunction" id="top" title="Go to top" aria-label="Back to top" class="float-right">
            <img src="../assets/upArrow.png" width="35" />
          </button>
        </div>
        
    </div>

    <div v-else class="py-10 px-6 max-w-[1000px]">
      <h1 class="font-montserrat text-white text-[2rem] font-bold mb-3 tracking-wider text-center max-[699px]:text-[1.2rem]">
        Loading
        <span class="ml-[-1.2%] animate-pulse delay-0">.</span>
        <span class="animate-pulse delay-150">.</span>
        <span class="animate-pulse delay-300">.</span>
      </h1>
      <div class="lg:grid grid-cols-2 gap-3 flex flex-col">
        <Skeleton v-for='skeleton in skeletonNum'/>
      </div>
    </div>  
  
</template>

<script setup>
    import { ref, watch } from 'vue'
    import FoodCard from './FoodCard.vue'
    import Button from './Button.vue'
    import Skeleton from './Skeleton.vue';

    const skeletonNum = Array(10)

    const props = defineProps({
        reccos: Array,
    })
    const isLoading = ref(true);

    watch(() => props.reccos, (newValue, oldValue) => {
    if (newValue.length === 0 || newValue.length > 0) {
      isLoading.value = false; // Data has been loaded
    }
  });

  const emit = defineEmits(['go-back'])

  const backButtonClicked = () => {
      isLoading.value = true
      emit('go-back')
  }

  const topFunction = () => {
    window.scrollTo({top: 0, behavior: 'smooth'})
  }



</script>