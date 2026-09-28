import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Product } from './models/product.model';
import { PokeApiService } from './services/pokeapi.service';

@Component({selector:'app-root',standalone:true,imports:[CommonModule,FormsModule],templateUrl:'./app.component.html'})
export class AppComponent {
  search=''; cart:{product:Product,qty:number}[]=[]; loginOpen=false; cartOpen=false; payOpen=false; toast=''; logged=false; pendingCheckout=false; apiConnected=false; apiLoading=true; selectedPay='nequi';
  active:{[key:string]:string}={lenceria:'Todos',jugueteria:'Todos',cosmetologia:'Todos'};
  catNames:any={lenceria:'Lencería',jugueteria:'Juguetería',cosmetologia:'Cosmetología'};
  categories=['lenceria','jugueteria','cosmetologia'];
  products:Product[]=[
    {id:1,name:'Conjunto Encaje Medianoche',category:'lenceria',subcategory:'Conjuntos',price:89000,color:'Negro',tags:['encaje','dos piezas'],icon:'conjunto'},
    {id:2,name:'Conjunto Two Piece Borgoña',category:'lenceria',subcategory:'Conjuntos',price:95000,color:'Rojo vino',tags:['dos piezas'],icon:'conjunto',badge:'Nuevo'},
    {id:3,name:'Conjunto Cut-Out Marfil',category:'lenceria',subcategory:'Conjuntos',price:99000,color:'Marfil',tags:['cut out'],icon:'conjunto'},
    {id:4,name:'Babydoll Transparencias',category:'lenceria',subcategory:'Babydolls',price:78000,color:'Negro',tags:['transparente'],icon:'babydoll'},
    {id:5,name:'Babydoll Satín Pasión',category:'lenceria',subcategory:'Babydolls',price:82000,color:'Rojo',tags:['satín'],icon:'babydoll',badge:'Bestseller'},
    {id:6,name:'Babydoll Floral Blush',category:'lenceria',subcategory:'Babydolls',price:76000,color:'Rosa',tags:['floral'],icon:'babydoll'},
    {id:7,name:'Body Encaje Wireless',category:'lenceria',subcategory:'Bodies',price:92000,color:'Negro',tags:['encaje','sin varilla'],icon:'body'},
    {id:8,name:'Body Cut-Out Seducción',category:'lenceria',subcategory:'Bodies',price:97000,color:'Rojo',tags:['cut out'],icon:'body'},
    {id:9,name:'Body Mesh Nude',category:'lenceria',subcategory:'Bodies',price:88000,color:'Nude',tags:['malla'],icon:'body'},
    {id:10,name:'Liguero Clásico',category:'lenceria',subcategory:'Medias y Ligueros',price:65000,color:'Negro',tags:['liguero'],icon:'medias'},
    {id:11,name:'Medias Veladas con Costura',category:'lenceria',subcategory:'Medias y Ligueros',price:38000,color:'Negro',tags:['veladas'],icon:'medias'},
    {id:12,name:'Set Liguero Seducción',category:'lenceria',subcategory:'Medias y Ligueros',price:72000,color:'Rojo',tags:['set'],icon:'medias',badge:'Nuevo'},
    {id:13,name:'Vibrador Clásico Satinado',category:'jugueteria',subcategory:'Vibradores',price:115000,color:'Rosa',tags:['clásico'],icon:'vibrador'},
    {id:14,name:'Vibrador Punto G',category:'jugueteria',subcategory:'Vibradores',price:135000,color:'Negro',tags:['punto g'],icon:'vibrador',badge:'Bestseller'},
    {id:15,name:'Mini Vibrador Discreto',category:'jugueteria',subcategory:'Vibradores',price:79000,color:'Morado',tags:['mini','discreto'],icon:'vibrador'},
    {id:16,name:'Dildo Realista Piel Natural',category:'jugueteria',subcategory:'Dildos',price:98000,color:'Beige',tags:['realista'],icon:'dildo'},
    {id:17,name:'Dildo Ondulado',category:'jugueteria',subcategory:'Dildos',price:87000,color:'Negro',tags:['ondulado'],icon:'dildo'},
    {id:18,name:'Dildo Cristal',category:'jugueteria',subcategory:'Dildos',price:110000,color:'Transparente',tags:['cristal'],icon:'dildo',badge:'Nuevo'},
    {id:19,name:'Anillo Vibrador Doble',category:'jugueteria',subcategory:'Anillos y Estimuladores',price:45000,color:'Morado',tags:['anillo'],icon:'anillo'},
    {id:20,name:'Anillo Silicona Básico',category:'jugueteria',subcategory:'Anillos y Estimuladores',price:29000,color:'Negro',tags:['anillo','básico'],icon:'anillo'},
    {id:21,name:'Estimulador Dual',category:'jugueteria',subcategory:'Anillos y Estimuladores',price:68000,color:'Rosa',tags:['dual'],icon:'anillo'},
    {id:22,name:'Bolas Chinas Kegel',category:'jugueteria',subcategory:'Bolas Chinas',price:56000,color:'Rosa',tags:['kegel'],icon:'bolas'},
    {id:23,name:'Bolas Chinas Peso Progresivo',category:'jugueteria',subcategory:'Bolas Chinas',price:62000,color:'Negro',tags:['progresivo'],icon:'bolas'},
    {id:24,name:'Set Bolas Entrenamiento',category:'jugueteria',subcategory:'Bolas Chinas',price:74000,color:'Morado',tags:['set'],icon:'bolas'},
    {id:25,name:'Esposas de Peluche',category:'jugueteria',subcategory:'Bondage',price:42000,color:'Rojo',tags:['esposas'],icon:'bondage'},
    {id:26,name:'Venda de Satín',category:'jugueteria',subcategory:'Bondage',price:25000,color:'Negro',tags:['venda'],icon:'bondage'},
    {id:27,name:'Kit Iniciación Bondage',category:'jugueteria',subcategory:'Bondage',price:99000,color:'Negro/Rojo',tags:['kit'],icon:'bondage',badge:'Nuevo'},
    {id:28,name:'Lubricante Base Agua',category:'cosmetologia',subcategory:'Lubricantes',price:35000,sabor:'Fresa',olor:'Fresa',tags:['base agua'],icon:'lubricante'},
    {id:29,name:'Lubricante Íntimo Neutro',category:'cosmetologia',subcategory:'Lubricantes',price:32000,sabor:'Neutro',tags:['neutro'],icon:'lubricante'},
    {id:30,name:'Lubricante Efecto Calor',category:'cosmetologia',subcategory:'Lubricantes',price:39000,sabor:'Chocolate',olor:'Chocolate',tags:['efecto calor'],icon:'lubricante',badge:'Bestseller'},
    {id:31,name:'Aceite de Masaje Vainilla',category:'cosmetologia',subcategory:'Aceites de Masaje',price:41000,olor:'Vainilla',tags:['masaje'],icon:'aceite'},
    {id:32,name:'Aceite Corporal Rosas',category:'cosmetologia',subcategory:'Aceites de Masaje',price:44000,olor:'Rosas',tags:['corporal'],icon:'aceite'},
    {id:33,name:'Aceite Comestible Menta',category:'cosmetologia',subcategory:'Aceites de Masaje',price:38000,sabor:'Menta',olor:'Menta',tags:['comestible'],icon:'aceite',badge:'Nuevo'},
    {id:34,name:'Gel Potenciador Femenino',category:'cosmetologia',subcategory:'Potenciadores',price:52000,tags:['femenino'],icon:'potenciador'},
    {id:35,name:'Crema Estimulante Unisex',category:'cosmetologia',subcategory:'Potenciadores',price:48000,tags:['unisex'],icon:'potenciador'},
    {id:36,name:'Spray Retardante',category:'cosmetologia',subcategory:'Potenciadores',price:55000,tags:['masculino'],icon:'potenciador'},
    {id:37,name:'Crema Hidratante Íntima',category:'cosmetologia',subcategory:'Cremas y Geles',price:36000,tags:['hidratante'],icon:'crema'},
    {id:38,name:'Gel Calmante Post Depilación',category:'cosmetologia',subcategory:'Cremas y Geles',price:33000,tags:['calmante'],icon:'crema'},
    {id:39,name:'Crema Reafirmante Corporal',category:'cosmetologia',subcategory:'Cremas y Geles',price:47000,tags:['reafirmante'],icon:'crema'}
  ];
  icons:any={vibrador:'◯',dildo:'◇',anillo:'◎',bolas:'◉',bondage:'∞',conjunto:'♢',babydoll:'♧',body:'♤',medias:'♧',lubricante:'▱',aceite:'◊',potenciador:'▯',crema:'▣'};
  constructor(private api:PokeApiService){this.api.checkConnection().subscribe(r=>{this.apiConnected=r.connected;this.apiLoading=false;});}
  money(n:number){return '$'+n.toLocaleString('es-CO');}
  normalize(s:string){return (s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();}
  meta(p:Product){return [p.color,p.sabor?'Sabor '+p.sabor:'',p.olor&&p.olor!==p.sabor?'Aroma '+p.olor:''].filter(Boolean).join(' · ');}
  subs(cat:string){return ['Todos',...new Set(this.products.filter(p=>p.category===cat).map(p=>p.subcategory))];}
  filtered(cat:string){const sub=this.active[cat]; return this.products.filter(p=>p.category===cat&&(sub==='Todos'||p.subcategory===sub));}
  searchResults(){const q=this.normalize(this.search.trim());if(!q)return [];return this.products.filter(p=>this.normalize([p.name,p.color,p.sabor,p.olor,p.subcategory,this.catNames[p.category],...p.tags].filter(Boolean).join(' ')).includes(q));}
  add(p:Product){const x=this.cart.find(i=>i.product.id===p.id);if(x)x.qty++;else this.cart.push({product:p,qty:1});this.cartOpen=true;this.toast='Producto agregado al carrito';setTimeout(()=>this.toast='',2200);}
  change(p:Product,d:number){const x=this.cart.find(i=>i.product.id===p.id);if(!x)return;x.qty+=d;if(x.qty<=0)this.cart=this.cart.filter(i=>i.product.id!==p.id);}
  total(){return this.cart.reduce((s,i)=>s+i.product.price*i.qty,0);}
  count(){return this.cart.reduce((s,i)=>s+i.qty,0);}
  openLogin(){this.loginOpen=true;this.cartOpen=false;this.payOpen=false;}
  startCheckout(){if(!this.cart.length)return;if(!this.logged){this.pendingCheckout=true;this.openLogin();return;}this.payOpen=true;this.cartOpen=false;}
  login(){this.logged=true;this.loginOpen=false;if(this.pendingCheckout){this.pendingCheckout=false;this.payOpen=true;}this.toast='Sesión iniciada';setTimeout(()=>this.toast='',2200);}
  confirm(){this.payOpen=false;this.cart=[];this.toast='Pedido confirmado correctamente';setTimeout(()=>this.toast='',2500);}
  scroll(id:string){document.getElementById(id)?.scrollIntoView({behavior:'smooth'});}
}
