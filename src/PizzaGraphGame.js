import React, { useState } from 'react';
import './PizzaGraphGame.css';

const ingredientGraph = {
    nodes: [
      // Основы
      { id: 'base', name: 'Тесто', compatibleWith: ['tomato_sauce', 'cheese'], type: 'base' },
      { id: 'tomato_sauce', name: 'Томатный соус', compatibleWith: ['cheese', 'pepperoni', 'mushrooms'], type: 'tasty' },
      { id: 'cheese', name: 'Моцарелла', compatibleWith: ['pepperoni', 'mushrooms', 'basil', 'oregano'], type: 'tasty' },
 
      // Мясные
      { id: 'pepperoni', name: 'Пепперони', compatibleWith: ['cheese', 'mushrooms', 'jalapenos'], type: 'tasty' },
      { id: 'ham', name: 'Ветчина', compatibleWith: ['cheese', 'pineapple'], type: 'tasty' },
      { id: 'bacon', name: 'Бекон', compatibleWith: ['cheese', 'tomato_sauce'], type: 'tasty' },
      { id: 'chicken', name: 'Курица', compatibleWith: ['cheese', 'tomato_sauce', 'bbq_sauce'], type: 'tasty' },
      { id: 'salami', name: 'Салями', compatibleWith: ['cheese', 'tomato_sauce'], type: 'tasty' },
      { id: 'sausage', name: 'Колбаса', compatibleWith: ['cheese', 'bell_pepper'], type: 'tasty' },
 
      // Овощи
      { id: 'mushrooms', name: 'Шампиньоны', compatibleWith: ['cheese', 'basil', 'oregano'], type: 'tasty' },
      { id: 'onion', name: 'Лук', compatibleWith: ['cheese', 'tomato_sauce'], type: 'neutral' },
      { id: 'bell_pepper', name: 'Сладкий перец', compatibleWith: ['cheese', 'tomato_sauce'], type: 'tasty' },
      { id: 'jalapenos', name: 'Халапеньо', compatibleWith: ['cheese', 'tomato_sauce', 'pepperoni'], type: 'tasty' },
      { id: 'spinach', name: 'Шпинат', compatibleWith: ['cheese', 'tomato_sauce'], type: 'neutral' },
      { id: 'arugula', name: 'Руккола', compatibleWith: ['cheese', 'tomato_sauce'], type: 'neutral' },
 
      // Морепродукты
      { id: 'shrimp', name: 'Креветки', compatibleWith: ['cheese', 'tomato_sauce'], type: 'neutral' },
      { id: 'squid', name: 'Кальмары', compatibleWith: ['cheese', 'tomato_sauce'], type: 'neutral' },
      { id: 'tuna', name: 'Тунец', compatibleWith: ['cheese', 'tomato_sauce'], type: 'neutral' },
 
      // Специи
      { id: 'oregano', name: 'Орегано', compatibleWith: ['cheese', 'tomato_sauce', 'basil'], type: 'neutral' },
      { id: 'basil', name: 'Базилик', compatibleWith: ['cheese', 'tomato_sauce'], type: 'tasty' },
      { id: 'black_pepper', name: 'Чёрный перец', compatibleWith: ['cheese', 'tomato_sauce'], type: 'neutral' },
      { id: 'garlic', name: 'Чеснок', compatibleWith: ['cheese', 'tomato_sauce'], type: 'neutral' },
      { id: 'rosemary', name: 'Розмарин', compatibleWith: ['chicken', 'potato'], type: 'neutral' },
 
      // Соусы
      { id: 'bbq_sauce', name: 'Барбекю соус', compatibleWith: ['chicken', 'cheese'], type: 'tasty' },
      { id: 'fish_sauce', name: 'Рыбный соус', compatibleWith: [], type: 'awful', punishment: 40 },
      { id: 'ranch_sauce', name: 'Ranch соус', compatibleWith: ['chicken', 'bacon'], type: 'tasty' },
 
      // Нейтральные
      { id: 'olives', name: 'Оливки', compatibleWith: ['tomato_sauce'], type: 'neutral' },
      { id: 'potato', name: 'Картофель', compatibleWith: ['cheese', 'rosemary'], type: 'neutral' },
 
      // Спорные
      { id: 'pineapple', name: 'Ананас', compatibleWith: ['ham', 'cheese'], type: 'controversial', punishment: 25 },
 
      // Отвратительные
      { id: 'anchovies', name: 'Анчоусы', compatibleWith: [], type: 'awful', punishment: 35 },
      { id: 'chocolate', name: 'Шоколад', compatibleWith: [], type: 'awful', punishment: 45 },
      { id: 'banana', name: 'Банан', compatibleWith: [], type: 'awful', punishment: 50 },
      { id: 'kiwi', name: 'Киви', compatibleWith: [], type: 'awful', punishment: 40 }
    ]
  };

const PizzaGraphGame = () => {
  const [selectedIngredients, setSelectedIngredients] = useState(['base']);
  const [compatibilityWarnings, setCompatibilityWarnings] = useState([]);
  const [ingredientWarnings, setIngredientWarnings] = useState([]);

  const addIngredient = (ingredient) => {
    const incompatibilities = checkIncompatibility(ingredient);
    const ingredientSpecificWarnings = checkIngredientType(ingredient);

    // Добавляем предупреждения, но не блокируем добавление
    setCompatibilityWarnings(incompatibilities);
    setIngredientWarnings(ingredientSpecificWarnings);

    // Проверяем, чтобы продукт не был добавлен дважды
    if (!selectedIngredients.includes(ingredient)) {
        setSelectedIngredients((prev) => [...prev, ingredient]);
    }
};

  const checkIncompatibility = (newIngredient) => {
    const warnings = [];
    const lastAddedIngredient = selectedIngredients[selectedIngredients.length - 1];
    const currentNode = ingredientGraph.nodes.find((n) => n.id === lastAddedIngredient);
    const newNode = ingredientGraph.nodes.find((n) => n.id === newIngredient);

    if (currentNode && !currentNode.compatibleWith.includes(newIngredient)) {
      warnings.push(`Ингредиент "${newNode.name}" плохо сочетается с "${currentNode.name}".`);
    }

    return warnings;
  };

  const checkIngredientType = (newIngredient) => {
    const warnings = [];
    const newNode = ingredientGraph.nodes.find((n) => n.id === newIngredient);

    if (newNode.type === 'awful') {
      warnings.push(`Внимание! Ингредиент "${newNode.name}" может испортить вкус пиццы.`);
    }

    if (newNode.type === 'controversial') {
      warnings.push(`Осторожно! Ингредиент "${newNode.name}" может вызвать разногласия.`);
    }

    return warnings;
  };

  const removeIngredient = (ingredient) => {
    if (ingredient !== 'base') {
      setSelectedIngredients((prev) => prev.filter((ing) => ing !== ingredient));
      setCompatibilityWarnings([]);
      setIngredientWarnings([]);
    }
  };

  const getAvailableIngredients = () => {
    const lastIngredient = selectedIngredients[selectedIngredients.length - 1];
    const currentNode = ingredientGraph.nodes.find((n) => n.id === lastIngredient);

    return ingredientGraph.nodes.filter(
      (node) => node.id !== 'base' && !selectedIngredients.includes(node.id) && 
      (currentNode?.compatibleWith.includes(node.id) || node.type === 'awful' || node.type === 'controversial')
    );
  };

  const calculateTastiness = () => {
    let baseScore = 50;
    selectedIngredients.forEach((ingredientId) => {
      const ingredient = ingredientGraph.nodes.find((n) => n.id === ingredientId);
      if (ingredient?.type === 'tasty') baseScore += 10;
      if (ingredient?.type === 'awful') baseScore -= ingredient.punishment || 20;
      if (ingredient?.type === 'controversial') baseScore -= ingredient.punishment || 15;
    });
    return Math.max(0, Math.min(baseScore, 100));
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1><strong>Pizza Graph Game</strong></h1>
      <h3>Выбранные ингредиенты:</h3>
      <ul>
        {selectedIngredients.map((id) => {
          const ingredient = ingredientGraph.nodes.find((node) => node.id === id);
          return (
            <li key={id}>
              {ingredient.name}{' '}
              {id !== 'base' && <button onClick={() => removeIngredient(id)}>Удалить</button>}
            </li>
          );
        })}
      </ul>

      <h3>Доступные ингредиенты:</h3>
      <ul>
        {getAvailableIngredients().map((ingredient) => (
          <li key={ingredient.id}>
            {ingredient.name}{' '}
            <button onClick={() => addIngredient(ingredient.id)}>Добавить</button>
          </li>
        ))}
      </ul>

      {compatibilityWarnings.length > 0 && (
        <div>
          <h3>Предупреждения о совместимости:</h3>
          <ul>
            {compatibilityWarnings.map((warning, index) => (
              <li key={index} style={{color: 'orange'}}>{warning}</li>
            ))}
          </ul>
        </div>
      )}

      {ingredientWarnings.length > 0 && (
        <div>
          <h3>Предупреждения об ингредиентах:</h3>
          <ul>
            {ingredientWarnings.map((warning, index) => (
              <li key={index} style={{color: 'red'}}>{warning}</li>
            ))}
          </ul>
        </div>
      )}

      <h3>Оценка вкусности: {calculateTastiness()}%</h3>
    </div>
  );
};

export default PizzaGraphGame;