<template>
  <div class="v-date-range">
    <v-menu
      v-model="menu"
      :close-on-content-click="false"
      offset-y
      v-bind="menuProps"
    >
      <template v-slot:activator="{ on }">
        <v-text-field
          slot="activator"
          class="v-date-range__input-field"
          prepend-inner-icon="event"
          :value="inputValue"
          readonly
          :disabled="disabled"
          :placeholder="placeholder"
          v-bind="inputProps"
          solo-inverted
          v-on="on"
        />
      </template>
      <v-card class="v-date-range__menu-content">
        <v-card-text>
          <div
            :data-days="highlightDates.length"
            :class="{
              'v-date-range__pickers': true,
              'v-date-range--highlighted': highlightDates.length
            }"
          >
            <v-card-title v-if="$slots.title">
              <slot v-if="$slots.title" name="title" />
            </v-card-title>
            <v-card-text>
              <div class="v-date-range__content">
                <div>
                  <h4>{{ $t('label.start_date') }}</h4>
                  <v-date-picker
                    v-model="pickerStart"
                    class="mr-4 v-date-range__picker--start v-date-range__picker"
                    :locale="locale"
                    :first-day-of-week="firstDayOfWeek"
                    :min="min"
                    :max="pickerEnd || max"
                    :no-title="noTitle"
                    :next-icon="nextIcon"
                    :prev-icon="prevIcon"
                    :events="highlightDates"
                    :event-color="highlightClasses"
                  />
                </div>
                <div>
                  <h4>{{ $t('label.end_date') }}</h4>
                  <v-date-picker
                    v-model="pickerEnd"
                    class="v-date-range__picker--end v-date-range__picker"
                    :locale="locale"
                    :first-day-of-week="firstDayOfWeek"
                    :min="pickerStart || min"
                    :max="max"
                    :no-title="noTitle"
                    :next-icon="nextIcon"
                    :prev-icon="prevIcon"
                    :events="highlightDates"
                    :event-color="highlightClasses"
                  />
                </div>
              </div>
            </v-card-text>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            @click="reset"
          >
            {{ mergedActionLabels.reset }}
          </v-btn>
          <v-btn
            @click="menu = false"
          >
            {{ mergedActionLabels.cancel }}
          </v-btn>
          <v-btn
            color="primary"
            :disabled="!bothSelected"
            @click="applyRange"
          >
            {{ mergedActionLabels.apply }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-menu>
  </div>
</template>
<script>
import { format, parse, differenceInCalendarDays, addDays } from 'date-fns'
import {
  ISO_FORMAT,
  DEFAULT_DATE,
  DEFAULT_ACTION_LABELS
} from '@/utils/constantVariable'
export default {
  name: 'RangeDatePicker',
  props: {
    // Take start and end as the input. Passable via v-model.
    value: {
      type: Object,
      default: () => {
        return { start: DEFAULT_DATE, end: DEFAULT_DATE }
      }
    },
    disabled: {
      type: Boolean,
      default: false
    },
    presets: {
      type: Array,
      default: () => {
        return []
      }
    },
    noPresets: {
      type: Boolean,
      default: false
    },
    // Denotes the Placeholder string for start date.
    startLabel: {
      type: String,
      default: ''
    },
    // Denotes the Placeholder string for start date.
    endLabel: {
      type: String,
      default: ''
    },
    placeHolder: {
      type: String,
      default: ''
    },
    // The string that gets placed between `startLabel` and `endLabel`
    separatorLabel: {
      type: String,
      default: '-'
    },
    presetLabel: {
      type: String,
      default: 'Presets'
    },
    actionLabels: {
      type: Object,
      default: () => {
        return DEFAULT_ACTION_LABELS
      }
    },
    /**
     * Following values are all passable to vuetify's own datepicker
     * component.
     */
    // Min selectable date.
    min: {
      type: String,
      default: undefined
    },
    // Max selectable date
    max: {
      type: String,
      default: undefined
    },
    // Locale
    locale: {
      type: String,
      default: 'en-us'
    },
    firstDayOfWeek: {
      type: [String, Number],
      default: 0
    },
    noTitle: {
      type: Boolean,
      default: false
    },
    displayFormat: {
      type: String,
      default: ''
    },
    highlightColor: {
      type: String,
      default: 'blue lighten-5'
    },
    showReset: {
      type: Boolean,
      default: true
    },
    /**
     * Icons
     */
    nextIcon: {
      type: String,
      default: '$vuetify.icons.next'
    },
    prevIcon: {
      type: String,
      default: '$vuetify.icons.prev'
    },
    inputProps: {
      type: Object,
      default: () => {
        return {}
      }
    },
    menuProps: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      menu: false,
      pickerStart: this.value.start,
      pickerEnd: this.value.end,
      highlightDates: [],
      highlightClasses: {}
    }
  },
  computed: {
    inputValue() {
      if (this.isValueEmpty) {
        return ''
      }
      const start = this.displayFormat
        ? this.formatDate(this.value.start, this.displayFormat)
        : this.value.start
      const end = this.displayFormat
        ? this.formatDate(this.value.end, this.displayFormat)
        : this.value.end
      return `${start}    ${this.separatorLabel}     ${end}`
    },
    placeholder() {
      if (this.placeHolder.length === 0) {
        return `${this.startLabel}    ${this.separatorLabel}    ${this.endLabel}`
      } else {
        return this.placeHolder
      }
    },
    /**
     * If the value prop doesn't have any start value,
     * its most likely that an empty object was passed.
     */
    isValueEmpty() {
      return !this.value.start
    },
    /**
     * If the user has selected both the dates or not
     */
    bothSelected() {
      return this.pickerStart && this.pickerEnd
    },
    isPresetActive() {
      return this.presets.map(
        preset =>
          preset.range[0] === this.pickerStart &&
          preset.range[1] === this.pickerEnd
      )
    },
    mergedActionLabels() {
      return { ...DEFAULT_ACTION_LABELS, ...this.actionLabels }
    }
  },
  watch: {
    // Watching to see if the menu is closed.
    menu(isOpen) {
      if (!isOpen) {
        this.closeMenu()
      } else {
        this.highlight()
      }
    },
    pickerStart: 'highlight',
    pickerEnd: 'highlight'
  },
  methods: {
    /**
     * Emit the input event with the updated range data.
     * This makes v-model work.
     */
    applyRange() {
      this.menu = false
      this.emitRange()
    },
    /**
     * Called every time the menu is closed.
     * It also emits an event to tell the parent
     * that the menu has closed.
     *
     * Upon closing the datepicker values are set
     * to the current selected value.
     */
    closeMenu() {
      // Reset the changed values for datepicker models.
      this.pickerStart = this.value.start
      this.pickerEnd = this.value.end
      this.highlight()
      this.$emit('menu-closed')
    },
    formatDate(date, fmt) {
      return format(parse(date, ISO_FORMAT, new Date()), fmt)
    },
    highlight() {
      if (!this.bothSelected) {
        return
      }
      const dates = []
      const classes = {}
      const start = parse(this.pickerStart, ISO_FORMAT, new Date())
      const end = parse(this.pickerEnd, ISO_FORMAT, new Date())
      const diff = Math.abs(differenceInCalendarDays(start, end))

      // Loop though all the days in range.
      for (let i = 0; i <= diff; i++) {
        const date = format(addDays(start, i), ISO_FORMAT)
        dates.push(date)
        const classesArr = []
        classesArr.push(`v-date-range__in-range`)
        classesArr.push(this.highlightColor)
        i === 0 && classesArr.push(`v-date-range__range-start`)
        i === diff && classesArr.push(`v-date-range__range-end`)
        classes[date] = classesArr.join(' ')
      }
      this.highlightDates = dates
      this.highlightClasses = classes
    },
    selectPreset(presetIndex) {
      this.pickerStart = this.presets[presetIndex].range[0]
      this.pickerEnd = this.presets[presetIndex].range[1]
    },
    reset() {
      // Reset Picker Values
      this.pickerStart = ''
      this.pickerEnd = ''
      this.highlightDates = []
      this.highlightClasses = {}
      this.emitRange()
    },
    emitRange() {
      this.$emit('input', {
        start: this.pickerStart,
        end: this.pickerEnd
      })
    }
  }
}
</script>
<style scoped lang="stylus">
  .v-date-range__input-field >>> input {
    text-align: center;
  }

  /* =============================================
  =            Menu Content            =
  ============================================= */
  .v-date-range__content {
    display: flex;

    >>> .v-date-picker-table {
      .v-btn {
        border-radius: 0;
      }
    }
  }

  /* =====  End of Menu Content  ====== */
  .v-date-range__pickers >>> .v-date-picker-table__events {
    height: 100%;
    width: 100%;
    top: 0;
    z-index: -1;
  }

  /* =============================================
  =            Date buttons            =
  ============================================= */
  .v-date-range__pickers >>> .v-date-picker-table table {
    width: auto;
    margin: auto;
    border-collapse: collapse;

    & th, & td {
      height: 32px;
      width: 32px;
    }

    & td {
      .v-btn {
        &.v-btn--outline {
          border: none;
          box-shadow: 0 0 0 1px currentColor inset;
        }

        &.v-btn--active::before {
          background-color: transparent !important;
        }
      }
    }
  }

  /* =====  End of Date buttons  ====== */
  /* =============================================
  =            Highlighting the even bubble dot            =
  ============================================= */
  .v-date-range__pickers >>> .v-date-range__in-range {
    height: 100%;
    width: 100%;
    margin: 0;
    border-radius: 0;
  }

  /* =====  End of Highlighting the even bubble dot  ====== */
</style>
