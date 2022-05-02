<template>
    <div>
        <draggable :options="{group: 'cards'}" group="cards" ghostClass="ghost">
        <span
        class="element-card"
        v-for="(card, index) in cards"
        :key="index"
        @click="togglePopup(card)"
        >
      {{ card.name }}
        </span>
        </draggable>
    </div>
</template>
<script>
import draggable from "vuedraggable";
import { mapGetters } from 'vuex';
export default {
    name: 'CardList',
    props: ["listId", "listName"],
    components: {
        draggable,
    },
    methods: {
    togglePopup(data) {
      const currentData = {
        listId: this.listId,
        listName: this.listName,
        id: data.id,
        name: data.name,
      };
      this.$store.dispatch("toggleOverlay");
      this.$store.dispatch("openForm", currentData);
      
    },
    },
    computed: {
    ...mapGetters(['currentData']),
    cards() {
      const cardFilteredByListId = this.$store.getters["cards"];
      return cardFilteredByListId.filter((card) => {
        if (card.listId === this.listId) {
          return true;
        } else {
          return false;
        }
      });
    },
    overlayIsActive() {
      return this.$store.getters["overlay"];
    },
    }
}
</script>
<style>
.element-card {
  position: relative;
  background-color: white;
  height: auto;
  display: flex;
  align-items: center;
  padding: 10px;
  border-radius: 5px;
  min-height: 30px;
  margin-bottom: 10px;
  word-break: break-all;
  text-align: left;
  cursor: grabbing;
}
.delete-btn {
  position: absolute; right: 10px;
  width: 30px;
  height: 30px;
  border: none;
  background: none;
  cursor: pointer;
  transition: all .3s ease;
}
.delete-btn:hover {
  background-color: #929fa2;
  color: #fff;
}
</style>