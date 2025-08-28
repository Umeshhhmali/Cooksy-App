# 🍳 Cooksy - Recipe Finder App

Cooksy is a **React Native mobile app** that helps you discover and save delicious recipes from around the world.  
Powered by [TheMealDB](https://www.themealdb.com/api.php), Cooksy provides meal details, images, and instructions for free without needing an API key.

---

## ✨ Features
- 🔍 **Search Recipes** by name or ingredients  
- 🎲 **Get Random Recipes** for inspiration  
- ❤️ **Like & Save Recipes** locally using AsyncStorage  
- 📖 **Detailed Recipe View** with ingredients and cooking steps  
- 🖼️ **Masonry Grid Layout** for recipe discovery  
- 🌙 **Smooth UI** with animations and responsive design  

---

## 🛠️ Tech Stack
- **React Native** (Expo)
- **React Navigation**
- **Reanimated** for animations
- **Masonry List** for dynamic grids
- **AsyncStorage** for saving liked recipes
- **TheMealDB API** for recipe data
- **Lucide Icons** for modern UI icons

---

## 📦 Installation

1. Clone the repository:
```
git clone https://github.com/your-username/cooksy.git
cd cooksy
```

2. Install dependencies:
```
npm install
```
  or
```
yarn install
```

3. Run the app:
```
npx expo start
```

---

## 🌐 API Usage
Cooksy uses the free public API from [TheMealDB](https://www.themealdb.com/).  
No custom API key is required – the app uses the default test key `1`.

**Examples:**
- Search meals by name:  
`https://www.themealdb.com/api/json/v1/1/search.php?s=chicken`

- Lookup meal by ID:  
`https://www.themealdb.com/api/json/v1/1/lookup.php?i=52772`

- Random meal:  
`https://www.themealdb.com/api/json/v1/1/random.php`

---

## 🚀 Usage Guide

### 🏠 Home Screen
- Browse recipes in a **masonry grid layout**.  
- Tap on a recipe to see full details.

### 🔎 Search Recipes
- Use the search bar to find recipes by **name** or **ingredient**.

### 📖 Recipe Details
- View ingredients, measurements, and cooking instructions.  
- See the meal thumbnail image.

### ❤️ Save Favorites
- Tap the **heart (❤️)** icon to like a recipe.  
- Recipes are saved locally using **AsyncStorage**.

### ⭐ Liked Recipes Screen
- Access all your liked recipes in one place.  
- Tap to view details again or remove from favorites.

---

## 📱 Screenshots (Optional)
<img width="162" height="363" alt="Screenshot_1756373169" src="https://github.com/user-attachments/assets/390cc570-43c5-43ca-91f9-7877fa8e9978" />
<img  width="162" height="363" alt="Screenshot_1756373460" src="https://github.com/user-attachments/assets/9ed23a6c-b4c7-4cb4-aa74-171676939c58" />
<img  width="162" height="363" alt="Screenshot_1756373498" src="https://github.com/user-attachments/assets/bccdb5b5-0a44-4f32-9c1a-837829c40ee9" />
<img  width="162" height="363" alt="Screenshot_1756373473" src="https://github.com/user-attachments/assets/1c282dd9-427d-4d72-ab8f-2d094a50409c" />
<img  width="162" height="363" alt="Screenshot_1756373504" src="https://github.com/user-attachments/assets/13a86e04-8c9e-46ca-9796-5bafcf0f0785" />


---

## 🤝 Contributing
Contributions, issues, and feature requests are welcome!  
Feel free to **fork the repo** and open a **pull request**.

---

## 📄 License
This project is licensed under the **MIT License**.

---

Made with ❤️ using **React Native**
