<script setup>
  import Form from './components/Form.vue'
  import { ref } from 'vue';

  const isFormShown = ref(false);

  const showForm = () => {
    isFormShown.value = !isFormShown.value;
  }
</script>

<template>
  <Transition name="fadeOut" appear>
  <main class="max-[500px]:flex max-[500px]:justify-center max-[500px]:items-center max-[500px]:flex-col min-h-screen max-[500px]:p-20 grid grid-cols-2 items-center mx-auto p-5 max-w-[1000px]" v-if="!isFormShown">
    <div class="relative">
      <img src="./assets/hero.png" alt="Man eating food"/>
      <img src="./assets/heroBg.png" alt="Paint splash backdrop" class="absolute z-[-10] top-[10%] left-[-4%] inset-0 w-[500px]"/>
    </div>

    <div class="flex items-center justify-center flex-col">
      <button class="motion-safe:animate-bounce hover:[animation-play-state:paused] transition-all duration-300 text-[#A87676] border border-[#A87676] rounded-[10px] font-montserrat bg-white hover:bg-transparent hover:text-white hover:border-white px-5 py-3 font-bold max-[500px]:text-[2rem] max-[700px]:text-[1.9rem] max-[800px]:text-[2.5rem] md:text-[3rem] max-[375px]:text-[1.4rem]" @click="showForm" aria-label="Eat Where Button">Eat Where?</button>
      <small class="text-white m-3 tracking-wider font-poppins text-center max-[500px]:text-[0.8rem] max-[700px]:text-[0.7rem]">For the <b><i>indecisive</i></b> Singaporean</small>
    </div>
  </main>
  </Transition>

  <Transition name="fadeIn">
    <main class="min-h-screen grid grid-cols-1 p-10 max-[500px]:p-2 max-[500px]:py-10" v-if="isFormShown">
      <Form @go-back="showForm"/>
    </main>
  </Transition>

</template>

