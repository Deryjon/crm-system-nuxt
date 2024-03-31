<script setup lang="ts">
import dayjs from 'dayjs';
import { useDealSlideStore } from '~/store/deal-slide.store';

const store = useDealSlideStore()
</script>


<template>
    <div class="border-border bg-black/20 rounded p-3">
        <div class="uppercase bold text-xl mb-4">0 сделке</div>
        <KanbanSlideoverLabel label-text="Наименование">
            <h2>
                {{ store.card?.name }}
            </h2>
        </KanbanSlideoverLabel>
        <KanbanSlideoverLabel label-text="Сумма">
            <h2>
                {{ store.card?.price || 0 }}
            </h2>
        </KanbanSlideoverLabel>
        <KanbanSlideoverLabel label-text="Статус">
            <UiBadge variant="outline">
                {{ store.card?.status }}

            </UiBadge>
        </KanbanSlideoverLabel>
        <KanbanSlideoverLabel label-text="Клиент">

            {{ store.card?.companyName }}

        </KanbanSlideoverLabel>
        <KanbanSlideoverLabel label-text="Дата-создания">

            {{ dayjs(store.card?.$createAt).format('DD MMMM YYYY') }}

        </KanbanSlideoverLabel>
    </div>
</template>