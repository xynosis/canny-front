<template lang="pug">
table.measure.center
    thead.f2
      tr 
        th.ph5 Date
        th.ph5 
        th.ph5 Item
        th.ph5 Quantity
        th.ph5 Price
    tbody.f3
      tr(v-for="items of getUser.orders") 
        th {{items.created_at}}
        th(v-for="stuff of items.items") 
          .ph5 {{stuff.thumbnail}}
          .ph5 {{stuff.title}}
          .ph5 {{stuff.quantity}}
          .ph5 {{stuff.unit_price}}
</template>