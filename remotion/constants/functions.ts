import { result } from './resultsRoman'

export enum CategoryEnum {
  Budget = 'Budget',
  Combi = 'Combi',
  Transport = 'Transport',
  Emotion = 'Emotion',
  Minivan = 'Minivan',
}

enum PowerEnum {
  Gas = 'Gas',
  Electro = 'Electro',
}

export type CategoriesType = Record<string, { count: number; cost: number }>

export type ReservationType = {
  location: any
  from_time: string
  to_time: string
  car: {
    id: number
    category: {
      id: number
      name: string
      key: number
    }
    number: number
    fuel_type: string | null
  }
  trip_mode: string
  total_cost: number
  total_driven_km: number
  car_details: [
    {
      id: number
      brand_name: string
      name: string
      external_number: number
      model_name: string
      color: string
      color_id: number
      energy_type: string | null
      number: number
    },
  ]
}

export const getCategories = (
  result: Array<ReservationType>,
): CategoriesType => {
  const categories = result.reduce((tot, curr) => {
    const existingRecord = tot[curr.car.category.name]
    const category = curr.car.category.name
    if (!existingRecord) {
      tot[category] = { count: 1, cost: curr.total_cost }
    } else {
      tot[category] = {
        count: tot[category].count + 1,
        cost: tot[category].cost + curr.total_cost,
      }
    }

    return tot
  }, {} as CategoriesType)
  return categories
}

export const getMostUsed = (categories: CategoriesType) => {
  let max: string | null = null

  Object.entries(categories).forEach(([key, value]) => {
    if (!max) {
      max = key
      return
    }
    if (categories[key].count > categories[max].count) {
      max = key
      return
    }
  })

  return max
}
