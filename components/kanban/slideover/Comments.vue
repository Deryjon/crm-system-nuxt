<script lang="ts" setup>
import dayjs from 'dayjs';
import type { IDeal } from '~/types/deals.types';
import { useCommentsByDeal } from './useComments';
import { useCreateComment } from './useCreateComment';
import { useDealSlideStore } from '~/store/deal-slide.store';

const { data, refetch, isLoading } = useCommentsByDeal()
const { commentRef, writeComment } = useCreateComment({ refetch })
const store = useDealSlideStore()

const card = store.card

</script>

<template>
    <UiInput placeholder="Оставьте комментарий" v-model="commentRef" @keyup.enter='writeComment' />
    <UiSkeleton v-if="isLoading" class="w-full h-[76px] rounded mt-5" />
    <div v-else-if="card">
        <div v-for="comment in card?.comments" :key="comment.$id" class="flex items-start mt-5">
            <Icon name="radix-icons:chat-bubble" class="mr-3 mt-1" size="20" />
            <div class="border-border bg-black/20 rounded p-3 text-[14px] w-full">
                Комментарий {{ dayjs(comment.$updatedAt).format('HH:mm') }}
                <p class="text-[20px]">{{ comment.text }}</p>
            </div>

        </div>
    </div>
</template>