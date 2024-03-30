<script setup lang="ts">
import { useMutation } from '@tanstack/vue-query';
import { v4 as uuid } from 'uuid'
import { defineProps } from 'vue'
import { COLLECTION_DEALS, DB_ID } from '~/app.constants';
import type { IDeal } from '~/types/deals.types';

const isOpenForm = ref(false)

interface IDealFormState extends Pick<IDeal, 'name' | 'price'> {
    customers: {
        email: string,
        name: string
    }
    status: string
}


const props = defineProps({
    status: {
        type: String,
        default: ''
    }, refetch: {
        type: Function
    }
})

const { handleSubmit, defineField, handleReset } = useForm<IDealFormState>({
    initialValues: {
        status: props.status
    }
})

const [name, nameAttrs] = defineField('name')
const [price, priceAttrs] = defineField('price')
const [customerEmail, customerEmailAttrs] = defineField('customers.email')
const [customerName, customerNameAttrs] = defineField('customers.name')


const { mutate, isPending } = useMutation({
    mutationKey: ['create a new deal'],
    mutationFn: (data: IDealFormState) => DB.createDocument(DB_ID, COLLECTION_DEALS, uuid(), data),
    onSuccess(data) {
        props.refetch && props.refetch()
        handleReset()
    }
})

const onSumbit = handleSubmit(values => {
    mutate(values)
})

</script>
<template>
    <div class="text-center mb-2">
        <button class="transition-all opacity-5 hover:opacity-100 hover:text-[#a252c8]"
            @click="isOpenForm = !isOpenForm">
            <Icon v-if="isOpenForm" name="radix-icons:arrow-up" size="35" class="fade-in-100 fade-out-0" />

            <Icon v-else name="radix-icons:plus-circled" size="35" class="fade-in-100 fade-out-0" />
        </button>
        <form v-if="isOpenForm" @submit="onSumbit" class="form">
            <UiInput placeholder="Наименование" v-model="name" v-bind="nameAttrs" type="text" class="input" />
            <UiInput placeholder="Сумма" v-model="price" v-bind="priceAttrs" type="text" class="input" />
            <UiInput placeholder="Email" v-model="customerEmail" v-bind="customerEmailAttrs" type="text"
                class="input" />
            <UiInput placeholder="Компания" v-model="customerName" v-bind="customerNameAttrs" type="text"
                class="input" />

            <button class="btn">
                {{ isPending ? 'Загрузка...' : 'Добавить' }}
            </button>
        </form>
    </div>
</template>
<style scoped>
.input {
    @apply border-[#161c26] mb-2 placeholder:text-[#748892] focus:border-border transition-colors
}

.btn {
    @apply text-xs border py-1 px-2 rounded border-[#161c26] hover:border-[#482c65] transition-colors text-[#aebed5] hover:text-white
}

.form {
    @apply mb-3 block;
    animation: show 0.3s ease-in-out
}

@keyframes show {
    from {
        @apply border-[#a252c83d];
        transform: translateY(-35px);
        opacity: 0.4;

    }

    90% {
        @apply border-[#a252c83d]
    }

    to {
        @apply border-transparent;
        transform: trandslateY(0);
        opacity: 1
    }
}
</style>