<template>

    <section v-show='formSubmitted' class="flex justify-center items-center">
        <FoodReccos :reccos="foodReccos" @go-back="restoreForm"/>
    </section>

    <section v-show='!formSubmitted' class="font-montserrat w-[80%] mx-auto border border-white rounded-[10px] shadow-xl p-9">
        <Button @click="backButtonClicked" title="Back to home"/>

        <h1 class="text-white text-center mb-3 font-bold tracking-wider text-[1.5rem]">Relax lah! We got you covered!</h1>

    <form class="flex flex-col font-poppins" @submit.prevent="handleSubmit">
        <label for="region" class="text-white">Region:</label>
        <select :class="useCurrentLocation ? 'cursor-not-allowed bg-transparent border-2 outline-none p-2 rounded-[8px]' : 'cursor-pointer bg-transparent border-2 outline-none p-2 rounded-[8px]'" name="region" id="region" v-model="regionSelected" @change="updateOptions" :disabled=useCurrentLocation>
            <option value="" disabled selected>Select Region</option>
            <option v-for="region in regions" :key="region.value" :value="region.value">{{ region.label }}</option>
        </select>

        <label for="location" class="mt-3 text-white">Location:</label>
        <select :class="enableAreaOptions ? 'cursor-not-allowed bg-transparent border-2 outline-none p-2 rounded-[8px]' : 'cursor-pointer bg-transparent border-2 outline-none p-2 rounded-[8px]'" name="location" id="location" v-model="locationSelected" :disabled=enableAreaOptions>
            <option value="" disabled selected>Select Location</option>
            <option v-for="area in areas" :key="area.value" :value="area.value">{{ area.label }}</option>
        </select>

        <p class="text-center text-white mt-2 font-semibold tracking-widest or"><span>OR</span></p>
        <p @click="updateLocationStatus" :class="useCurrentLocation ? 'text-[#A87676] bg-white text-center cursor-pointer border-2 outline-none p-2 mt-2 rounded-[8px] hover:bg-[#A87676] hover:text-white transition-all duration-300' : 'text-white text-center cursor-pointer border outline-none p-2 rounded-[8px] hover:bg-white hover:text-[#A87676] transition-all duration-300 mt-2'">{{useCurrentLocation ? "Disable Current Location" : 'Enable Current Location'}}</p>
        

        <label for="category" class="mt-3 text-white">Food Category:</label>
        <select class='bg-transparent cursor-pointer border-2 outline-none p-2 rounded-[8px]' name="category" id="category" v-model="categorySelected">
            <option value="">Select Category</option>
            <option v-for="category in categories" :key="category.value" :value="category.value">{{ category.label }}</option>
        </select>

        <div class="mt-5 text-white flex flex-col">
            <label for="range">Radius: </label>
            <input type="range" id="range" name="range" min="1" max="5" v-model="radiusSelected" class="block mt-1 cursor-pointer"/>
        </div>

        <p class="text-white mt-3">Current radius: <em>{{ radiusSelected }}km</em></p>

        <button type="submit" class="transition-all duration-300 text-[#A87676] text-[1rem] border border-[#A87676] rounded-[10px] font-montserrat bg-white hover:bg-transparent hover:text-white hover:border-white px-5 py-3 font-bold mt-10" title="Get Reccos">Faster recco leh</button>
    </form>
</section>

</template>

<script setup>
    import FoodReccos from './FoodReccos.vue'
    import Button from './Button.vue'
    import { ref, watch } from 'vue';
    import { useToast } from "vue-toastification";

    const toast = useToast()
    
    const regionSelected = ref('');
    const locationSelected = ref('');
    const categorySelected = ref('');
    const radiusSelected = ref(3);
    const prevRegionSelected = ref(regionSelected.value)
    const prevLocationSelected = ref(locationSelected.value)

    const lat = ref(null);
    const long = ref(null);
    const useCurrentLocation = ref(false)
    let enableAreaOptions = ref(true)
    let formSubmitted = ref(false)

    let foodReccos = ref([])

    const areas = ref([{value: '', label: 'Select Location'}])
    const regions = [
        {value: 'central', label: 'Central'},
        {value: 'east', label: 'East'},
        {value: 'north', label: 'North'},
        {value: 'northeast', label: 'North-East'},
        {value: 'west', label: 'West'},
    ]
    const categories = [
        {value: 'african', label: 'African'},
        {value: 'american', label: 'American'},
        {value: 'australian', label: 'Australian'},
        {value: 'bbq', label: 'Barbeque'},
        {value: 'bistros', label: 'Bistros'},
        {value: 'brazilian', label: 'Brazilian'},
        {value: 'breakfast_brunch', label: 'Breakfast & Brunch'},
        {value: 'british', label: 'British'},
        {value: 'buffets', label: 'Buffets'},
        {value: 'british', label: 'British'},
        {value: 'burgers', label: 'Burgers'},
        {value: 'cambodian', label: 'Cambodian'},
        {value: 'canadian', label: 'Canadian'},
        {value: 'caribbean', label: 'Caribbean'},
        {value: 'catalan', label: 'Catalan'},
        {value: 'cheesesteaks', label: 'Cheesesteaks'},
        {value: 'chicken _wings', label: 'Chicken Wings'},
        {value: 'chilean', label: 'Chilean'},
        {value: 'comfortfood', label: 'Comfort Food'},
        {value: 'czech', label: 'Czech'},
        {value: 'dumplings', label: 'Dumplings'},
        {value: 'eastern_european', label: 'Eastern European'},
        {value: 'ethiopian', label: 'Ethiopian'},
        {value: 'filipino', label: 'Filipino'},
        {value: 'fishnchips', label: 'Fish & Chips'},
        {value: 'flatbread', label: 'Flatbread'},
        {value: 'fondue', label: 'Fondue'},
        {value: 'food_court', label: 'Food Court'},
        {value: 'french', label: 'French'},
        {value: 'german', label: 'German'},
        {value: 'greek', label: 'Greek'},
        {value: 'halal', label: 'Halal'},
        {value: 'hawaiian', label: 'Hawaiian'},
        {value: 'hotpot', label: 'Hot Pot'},
        {value: 'indian', label: 'Indian'},
        {value: 'indonesian', label: 'Indonesian'},
        {value: 'italian', label: 'Italian'},
        {value: 'japanese', label: 'Japanese'},
        {value: 'kebab', label: 'Kebab'},
        {value: 'kopitiam', label: 'Kopitiam'},
        {value: 'korean', label: 'Korean'},
        {value: 'kosher', label: 'Kosher'},
        {value: 'laotian', label: 'Laotian'},
        {value: 'malaysian', label: 'Malaysian'},
        {value: 'mediterranean', label: 'Mediterranean'},
        {value: 'mongolian', label: 'Mongolian'},
        {value: 'mediterranean', label: 'Mediterranean'},
        {value: 'noodles', label: 'Noodles'},
        {value: 'pizza', label: 'Pizza'},
        {value: 'portuguese', label: 'Portuguese'},
        {value: 'seafood', label: 'Seafood'},
        {value: 'soup', label: 'Soup'},
        {value: 'steakhouses', label: 'Steakhouses'},
        {value: 'sushi', label: 'Sushi Bars'},
        {value: 'taiwanese', label: 'Taiwanese'},
        {value: 'thai', label: 'Thai'},
        {value: 'vegan', label: 'Vegan'},
        {value: 'vegetarian', label: 'Vegetarian'},
        {value: 'vietnamese', label: 'Vietnamese'},
        {value: 'waffles', label: 'Waffles'},
    ]

    watch(regionSelected, (newVal, oldVal) => {
        if (newVal) {
            locationSelected.value = ''
        }

        if (newVal.length === 0) {
            enableAreaOptions.value = true
            prevRegionSelected.value = oldVal
        } else {
            enableAreaOptions.value = false
        }
    })

    watch(locationSelected, (newVal, oldVal) => {
        prevLocationSelected.value = oldVal
    })

    watch(useCurrentLocation, newVal => {
        if (newVal) {
            regionSelected.value = ''
            locationSelected.value = ''
        } else {
            regionSelected.value = prevRegionSelected.value
            locationSelected.value = prevLocationSelected.value
        }
    })

    watch(lat, newLat => {
        lat.value = newLat
    }, { deep: true })

    watch(long, newLong => {
        long.value = newLong
    }, { deep: true })
    
    const updateOptions = () => {
        areas.value = []

        if (regionSelected.value == 'central') {
            areas.value.push({ value: 'bishan', label: 'Bishan' })
            areas.value.push({ value: 'bukit merah', label: 'Bukit Merah' })
            areas.value.push({ value: 'bukit timah', label: 'Bukit Timah' })
            areas.value.push({ value: 'bugis', label: 'Bugis' })
            areas.value.push({ value: 'city hall', label: 'City Hall' })
            areas.value.push({ value: 'raffles place', label: 'Raffles Place' })
            areas.value.push({ value: 'tanjong pagar', label: 'Tanjong Pagar' })
            areas.value.push({ value: 'geylang', label: 'Geylang' })
            areas.value.push({ value: 'kallang', label: 'Kallang' })
            areas.value.push({ value: 'bras basah', label: 'Bras Basah' })
            areas.value.push({ value: 'dhoby ghaut', label: 'Dhoby Ghaut' })
            areas.value.push({ value: 'newton', label: 'Newton' })
            areas.value.push({ value: 'novena', label: 'Novena' })
            areas.value.push({ value: 'orchard', label: 'Orchard' })
            areas.value.push({ value: 'outram', label: 'Outram' })
            areas.value.push({ value: 'queenstown', label: 'Queenstown' })
            areas.value.push({ value: 'toa payoh', label: 'Toa Payoh' })
        }
        else if (regionSelected.value == 'east') {
            areas.value.push({ value: 'bedok', label: 'Bedok' })
            areas.value.push({ value: 'changi', label: 'Changi' })
            areas.value.push({ value: 'pasir ris', label: 'Pasir Ris' })
            areas.value.push({ value: 'paya lebar', label: 'Paya Lebar' })
            areas.value.push({ value: 'tampines', label: 'Tampines' })
        }
        else if (regionSelected.value == 'north') {
            areas.value.push({ value: 'lim chu kang', label: 'Lim Chu Kang' })
            areas.value.push({ value: 'sembawang', label: 'Sembawang' })
            areas.value.push({ value: 'woodlands', label: 'Woodlands' })
            areas.value.push({ value: 'yishun', label: 'Yishun' })
        }
        else if (regionSelected.value == 'northeast') {
            areas.value.push({ value: 'ang mo kio', label: 'Ang Mo Kio' })
            areas.value.push({ value: 'hougang', label: 'Hougang' })
            areas.value.push({ value: 'punggol', label: 'Punggol' })
            areas.value.push({ value: 'sengkang', label: 'Sengkang' })
            areas.value.push({ value: 'serangoon', label: 'Serangoon' })
        }
        else if (regionSelected.value == 'west') {
            areas.value.push({ value: 'boon lay', label: 'Boon Lay' })
            areas.value.push({ value: 'bukit batok', label: 'Bukit Batok' })
            areas.value.push({ value: 'bukit panjang', label: 'Bukit Panjang' })
            areas.value.push({ value: 'choa chu kang', label: 'Choa Chu Kang' })
            areas.value.push({ value: 'clementi', label: 'Clementi' })
            areas.value.push({ value: 'jurong east', label: 'Jurong East' })
            areas.value.push({ value: 'jurong west', label: 'Jurong West' })
            areas.value.push({ value: 'pioneer', label: 'Pioneer' })
            areas.value.push({ value: 'tuas', label: 'Tuas' })
        } 
    }

    const updateLocationStatus = () => {
        if (useCurrentLocation.value) {
            useCurrentLocation.value = false
        } else {
            useCurrentLocation.value = true
        }
    }

    function getLocation() {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(position => {
                resolve(position.coords);
            }, error => {
                reject(error);
            });
        });
    }

const handleSubmit = async () => {
    if (!locationSelected.value && useCurrentLocation.value === false) {
        return toast.error("Location must be provided!", {timeout: 4000});
    }
    if (!categorySelected.value) {
        return toast.error("Category must be provided!", {timeout: 4000});
    }
    formSubmitted.value = true

    if (useCurrentLocation.value) {
        try {
            const position = await getLocation();
            lat.value = position.latitude;
            long.value = position.longitude;
        } catch (error) {
            console.error('Error getting location:', error);
        }
    } else {
        lat.value = null;
        long.value = null;
    }

    const response = await fetch('https://eat-where-server.vercel.app/getRecco', {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }, 
        method: 'POST',
        body: JSON.stringify({
            location: locationSelected.value,
            currentLocation: {
                latitude: lat.value,
                longitude: long.value
            },
            category: categorySelected.value,
            radius: radiusSelected.value
        })
    })
    foodReccos.value = await response.json()
}
    const emit = defineEmits(['go-back'])

    const backButtonClicked = () => {
        toast.clear()
        emit('go-back')
    }

    const restoreForm = () => {
        formSubmitted.value = false
    }
</script>