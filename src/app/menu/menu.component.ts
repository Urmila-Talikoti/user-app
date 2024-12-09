import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-menu',
  imports: [NgFor,FormsModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  searchQuery: string = '';

  menuItems = [
    {
      name: 'Veggie Burger',
      description: 'A delicious vegetarian burger with a savory patty, lettuce, tomato, and avocado.',
      price: 80,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQVrO9FKarrAGq08vByBi6iEz-wLoEUi7c_g&s'
    },
    {
      name: 'Paneer Tikka',
      description: 'Grilled paneer marinated in spices and yogurt, served with a tangy chutney.',
      price: 100,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjcRG1xObZGWdJzCMKuu0IE-dXbgT6uFZDUw&s'
    },
    {
      name: 'Veggie Pizza',
      description: 'A pizza topped with fresh vegetables, including bell peppers, onions, olives, and mushrooms.',
      price: 120,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1S45iwzftJOtoG4E8AfsDvX9Ppilqd_267A&s'
    },
    {
      name: 'Aloo Gobi',
      description: 'A comforting dish of spiced potatoes and cauliflower, served with warm naan.',
      price: 90,
      image: 'https://www.foodandwine.com/thmb/cMZecoM65AevIDFL4BC9bn0ZNGQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Aloo-Gobi-FT-RECIPE0623-d0555d951f26447cb2f2d99e00ccc660.jpg'
    },
    {
      name: 'Vegetable Stir Fry',
      description: 'A mix of colorful vegetables stir-fried with soy sauce and served with steamed rice.',
      price: 110,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXWMgfgNvk-ZcfgekMci5xRGuKHcTIpiyhwQ&s'
    },
    {
      name: 'Falafel Wrap',
      description: 'Crispy falafel balls wrapped in a pita with lettuce, cucumber, and tahini sauce.',
      price: 70,
      image: 'https://lynnecurry.com/wp-content/uploads/2024/08/hummus-wrap-recipe-1723111114.jpg'
    },
    {
      name: 'Palak Paneer',
      description: 'A mix of colorful vegetables stir-fried with soy sauce and served with steamed rice.',
      price: 150,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzInsg3XxMcqrU233PO3em4HBiNRWuDwMWoQ&s'
    },
    {
      name: 'Chole Bhature',
      description: 'Crispy falafel balls wrapped in a pita with lettuce, cucumber, and tahini sauce.',
      price: 80,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFT0KL1aWLt6kDqe9rt40V3mJadECaPnioNhP9qFqBfzgdPlOtdzwqBS0RaefgZM8SkAY&usqp=CAU'
    }
  ];


  filteredMenuItems() {
    if (!this.searchQuery) {
      return this.menuItems;
    }
    return this.menuItems.filter(item =>
      item.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }
}
