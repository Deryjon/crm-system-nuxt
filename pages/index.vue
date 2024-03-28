<script setup lang="ts">
useSeoMeta({
    title: 'Home | CRM System',
})


const dragCardRef = ref<ICard | null>(null)
const sourceColumnRef = ref<IColumn | null>(null)



</script>
<template>
    <div class="p-10">
        <h1 class="font-bold text-2xl mb-10">CRM System bt Dery</h1>
        <div class="">
            <UiCard class="mb-3" draggable="true">
                <UiCardHeader role="button">name card</UiCardHeader>
                <UiCardContent>компания</UiCardContent>
                <UiCardFooter>Date</UiCardFooter>
            </UiCard>
        </div>
    </div>
</template>