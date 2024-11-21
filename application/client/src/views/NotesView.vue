<template>
  <BaseView>
    <template #default>
      <section>
        <h1>Create a New Note</h1>
        <form @submit.prevent="submitNote">
          <div>
            <label for="title">Title:</label>
            <input type="text" id="title" v-model="note.title" required />
          </div>
          <div>
            <label for="content">Content:</label>
            <textarea id="content" v-model="note.content" required></textarea>
          </div>
          <div>
            <label for="tags">Tags:</label>
            <input type="text" id="tags" v-model="note.tags" />
          </div>
          <button type="submit">Create Note</button>
        </form>
      </section>
    </template>
  </BaseView>
</template>

<script>
import BaseView from './BaseView.vue'
import axios from 'axios'

export default {
  name: 'NotesView',
  components: {
    BaseView
  },
  data() {
    return {
      note: {
        title: '',
        content: '',
        tags: ''
      }
    }
  },
  methods: {
    async submitNote() {
      try {
        const response = await axios.post('/api/notes', this.note)
        if (response.status === 201) {
          alert('Note added successfully')
          this.resetForm()
        }
      } catch (error) {
        console.error('Failed to add note:', error)
        alert('Failed to add note')
      }
    },
    resetForm() {
      this.note.title = ''
      this.note.content = ''
      this.note.tags = ''
    }
  }
}
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

button {
  align-self: flex-start;
}
</style>
