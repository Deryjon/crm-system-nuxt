<script setup lang="ts">
import { useKanbanQuery } from '@/components/kanban/useKanbanQuery'
import type { ICard, IColumn } from '~/components/kanban/kanban.types'
import { convertCurrency } from '@/utils/convertCurrency'
import dayjs from 'dayjs';
useSeoMeta({
    title: 'Home | CRM System',
})



const dragCardRef = ref<ICard | null>(null)
const sourceColumnRef = ref<IColumn | null>(null)

const { data, isLoading, refetch } = useKanbanQuery()




</script>
<template>
    <div class="p-10">
        <h1 class="font-bold text-2xl mb-10">CRM System by Dery</h1>
        <div class="" v-if="isLoading">Loading...</div>
        <div class="" v-else>
            <div class="grid grid-cols-5 gap-6">
                <div v-for="(column, index) in data" :key="column.id">
                    <div class="rounded bg-slate-700 py-1 px-5 mb-2 text-center">
                        {{ column.name }}
                    </div>
                    <div class="">

                    </div>
                    <UiCard v-for="card in column.items" :key="card.id" class="mb-3" draggable="true">
                        <UiCardHeader role="button">{{ card.name }}</UiCardHeader>
                        <UiCardContent class="opacity-70 text-xs">{{ convertCurrency(card.price) }}</UiCardContent>
                        <UiCardContent class="text-xs"> Компания {{ card.customers.name }}</UiCardContent>
                        <UiCardFooter>{{ dayjs(card.customers.$createdAt).format('DD MMMM YYYY') }}</UiCardFooter>
                    </UiCard>
                </div>
            </div>
        </div>
    </div>
</template>