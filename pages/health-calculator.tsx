"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, Users, Heart, Baby, Calculator, DollarSign, Globe } from 'lucide-react'
import { cn } from "@/lib/utils"
import * as RadioGroup from '@radix-ui/react-radio-group'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

interface CalculatorState {
  plan: string
  ageGroup: string
  isMarried: boolean
  children: number
  dependents: number
}

const plans = ["2-210", "2-310", "2-410", "2-450", "2-510"]
const ageGroups = ["up to 27", "28 to 35", "36+"]

const translations = {
  en: {
    title: "Health Insurance Calculator",
    subtitle: "Estimate your annual health insurance cost",
    plan: "Insurance Plan",
    age: "Age Group",
    married: "Married",
    children: "Children",
    dependents: "Dependents",
    calculate: "Calculate",
    calculating: "Calculating...",
    annualCost: "Estimated Annual Cost",
  },
  es: {
    title: "Calculadora de Seguro de Salud",
    subtitle: "Estime su costo anual de seguro de salud",
    plan: "Plan de Seguro",
    age: "Grupo de Edad",
    married: "Casado/a",
    children: "Hijos",
    dependents: "Dependientes",
    calculate: "Calcular",
    calculating: "Calculando...",
    annualCost: "Costo Anual Estimado",
  },
}

export default function HealthCalculator() {
  const [formState, setFormState] = useState<CalculatorState>({
    plan: "2-310",
    ageGroup: "up to 27",
    isMarried: false,
    children: 0,
    dependents: 0,
  })
  const [total, setTotal] = useState<number | null>(null)
  const [isCalculating, setIsCalculating] = useState(false)
  const [language, setLanguage] = useState<"en" | "es">("en")

  const t = translations[language]

const pricingTable = {
  "2-210": { "up to 27": [101257, 202514, 67218, 30334, 274761], "28 to 35": [151912, 264766, 67218, 30334, 274761], "36+": [208596, 352554, 67218, 30334, 274761] },
  "2-310": { "up to 27": [132383, 264766, 88944, 35015, 354872], "28 to 35": [197846, 395692, 88944, 35015, 354872], "36+": [269748, 523818, 88944, 35015, 354872] },
  "2-410": { "up to 27": [176277, 352554, 115869, 46097, 485283], "28 to 35": [261909, 523818, 115869, 46097, 485283], "36+": [368934, 612806, 115869, 46097, 485283] },
  "2-450": { "up to 27": [266789, 533578, 155898, 89913, 629942], "28 to 35": [398920, 797840, 155898, 89913, 629942], "36+": [603521, 947404, 155898, 89913, 629942] },
  "2-510": { "up to 27": [436543, 873086, 272495, 136478, 983150], "28 to 35": [660843, 1321686, 272495, 136478, 983150], "36+": [957513, 1564227, 272495, 136478, 983150] }
};

const handleCalculate = () => {
  setIsCalculating(true);
  setTimeout(() => {
    const { plan, ageGroup, isMarried, children, dependents } = formState;

    // Fetch the appropriate pricing
    const [base, marriageCost, firstChild, additionalChild, dependentCost] = pricingTable[plan][ageGroup];
    let total = isMarried ? marriageCost : base;

    // Add cost for children
    if (children > 0) total += firstChild + (children - 1) * additionalChild;

    // Add cost for dependents
    total += dependents * dependentCost;

    setTotal(total);
    setIsCalculating(false);
  }, 800);
};

  const toggleLanguage = () => {
    setLanguage(prev => prev === "en" ? "es" : "en")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 p-4 flex items-center justify-center text-white font-sans">
      <div className="w-full max-w-md space-y-8">
        <motion.div
        
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-2"
        >
          <Heart className="w-12 h-12 text-pink-400 mx-auto" />
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-600">
            {t.title}
          </h1>
          <p className="text-gray-300">{t.subtitle}</p>
          <Button
            onClick={toggleLanguage}
            className="mt-2 bg-white/10 hover:bg-white/20 text-white rounded-full px-3 py-1 text-sm flex items-center gap-2 transition-all duration-300"
          >
            <Globe className="w-4 h-4" />
            {language === "en" ? "Español" : "English"}
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-6 bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-xl"
        >
          <div className="space-y-6">
            <div className="space-y-2">
              <Label className="text-sm font-medium flex items-center gap-2">
                <Calculator className="w-4 h-4 text-pink-400" />
                {t.plan}
              </Label>
              <RadioGroup.Root
                value={formState.plan}
                onValueChange={(value) => setFormState({ ...formState, plan: value })}
                className="flex flex-wrap gap-2"
              >
                {plans.map((plan) => (
                  <RadioGroup.Item
                    key={plan}
                    value={plan}
                    className={cn(
                      "px-3 py-2 rounded-full text-sm font-medium transition-all duration-300",
                      "bg-white/5 hover:bg-white/10",
                      "data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-pink-500 data-[state=checked]:to-purple-600"
                    )}
                  >
                    {plan}
                  </RadioGroup.Item>
                ))}
              </RadioGroup.Root>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium flex items-center gap-2">
                <Users className="w-4 h-4 text-pink-400" />
                {t.age}
              </Label>
              <RadioGroup.Root
                value={formState.ageGroup}
                onValueChange={(value) => setFormState({ ...formState, ageGroup: value })}
                className="flex flex-wrap gap-2"
              >
                {ageGroups.map((age) => (
                  <RadioGroup.Item
                    key={age}
                    value={age}
                    className={cn(
                      "px-3 py-2 rounded-full text-sm font-medium transition-all duration-300",
                      "bg-white/5 hover:bg-white/10",
                      "data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-pink-500 data-[state=checked]:to-purple-600"
                    )}
                  >
                    {age}
                  </RadioGroup.Item>
                ))}
              </RadioGroup.Root>
            </div>

            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium flex items-center gap-2">
                <Users className="w-4 h-4 text-pink-400" />
                {t.married}
              </Label>
              <Switch
                checked={formState.isMarried}
                onCheckedChange={(checked) => setFormState({ ...formState, isMarried: checked })}
                className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-pink-500 data-[state=checked]:to-purple-600"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium flex items-center gap-2">
                  <Baby className="w-4 h-4 text-pink-400" />
                  {t.children}
                </Label>
                <Input
                  type="number"
                  min="0"
                  value={formState.children}
                  onChange={(e) =>
                    setFormState({ ...formState, children: parseInt(e.target.value) || 0 })
                  }
                  className="bg-white/5 border-white/10 text-white text-center rounded-full"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium flex items-center gap-2">
                  <Users className="w-4 h-4 text-pink-400" />
                  {t.dependents}
                </Label>
                <Input
                  type="number"
                  min="0"
                  value={formState.dependents}
                  onChange={(e) =>
                    setFormState({ ...formState, dependents: parseInt(e.target.value) || 0 })
                  }
                  className="bg-white/5 border-white/10 text-white text-center rounded-full"
                />
              </div>
            </div>
          </div>

          <Button
            className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold py-3 px-4 rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 text-lg"
            onClick={handleCalculate}
            disabled={isCalculating}
          >
            {isCalculating ? (
              <motion.div
                className="flex items-center justify-center gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <motion.div
                  className="h-4 w-4 rounded-full bg-white"
                  animate={{ scale: [1, 0.8, 1] }}
                  transition={{ repeat: Infinity, duration: 0.8, ease: "easeInOut" }}
                />
                {t.calculating}
              </motion.div>
            ) : (
              t.calculate
            )}
          </Button>
        </motion.div>

        <AnimatePresence>
          {total !== null && (
            <motion.div
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-xl text-center space-y-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-gray-300">{t.annualCost}</div>
              <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-600">
                ${total.toLocaleString()}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

