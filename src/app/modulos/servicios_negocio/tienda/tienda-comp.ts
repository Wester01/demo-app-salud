import { Component, computed, signal } from '@angular/core';

@Component({
  selector: 'app-tienda-comp',
  standalone: true,
  imports: [],
  templateUrl: './tienda-comp.html',
  styleUrl: './tienda-comp.scss',
})
export class TiendaComp {
  categoriaSeleccionada = signal<string>('todos');

  productos = [
    {
      nombre: 'ACEITE ARTICULAR',
      categoria: 'aceites',
      descripcion: 'Acción antiinflamatoria y analgésica para dolores articulares.',
      precios: [{ tamanio: '100ml', valor: 11 }],
      img: 'tarjetas/aceite.png'
    },
    {
      nombre: 'ACEITE SLEEP',
      categoria: 'aceites',
      descripcion: 'Favorece el sueño profundo. Aplicar en sienes y muñecas.',
      precios: [
        { tamanio: '100ml', valor: 12 },
        { tamanio: '50ml', valor: 9 },
        { tamanio: '10ml', valor: 5 }
      ],
      img: 'tarjetas/aceite2.png'
    },
    {
      nombre: 'VELA ALQUÍMICA "SALE LA LUZ"',
      categoria: 'velas',
      descripcion: 'Cera de soja natural con aceites esenciales para limpiar la energía del hogar.',
      precios: [{ tamanio: 'Grande', valor: 15 }, { tamanio: 'Mediana', valor: 10 }],
      img: 'tarjetas/velas2.png'
    },
    {
      nombre: 'VELA MEDITACIÓN AZUL',
      categoria: 'velas',
      descripcion: 'Ideal para sesiones de Iridología o meditación profunda.',
      precios: [{ tamanio: 'Único', valor: 12 }],
      img: 'tarjetas/velas.png'
    },
    {
      nombre: 'CREMA MAGNIFICA REPARADORA',
      categoria: 'cremas',
      descripcion: 'Ideal para sesiones de Descanso Holístico o meditación profunda.',
      precios: [{ tamanio: 'Único', valor: 12 }],
      img: 'tarjetas/cremoso.png'
    },
    {
      nombre: 'CREMA ASOMBROSA DESTRUCTORA DE TENSIÓN',
      categoria: 'cremas',
      descripcion: 'Ideal para sesiones de Descanso Profundo y reparación Ancestral del alma.',
      precios: [{ tamanio: 'Único', valor: 12 }],
      img: 'tarjetas/cremas2.png'
    },
    // ... resto de productos aquí
  ];

  // Filtro mágico con Signals
  productosFiltrados = computed(() => {
    if (this.categoriaSeleccionada() === 'todos') return this.productos;
    return this.productos.filter(p => p.categoria === this.categoriaSeleccionada());
  });

  pedirPorWhatsapp(producto: any, formato: string) {
    const mensaje = `Hola! Estoy interesado en el ${producto.nombre} de ${formato}. Me podrías dar más información?`;
    const url = `https://wa.me/34600000000?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
  }
}
