        // Data UMKM Mockup
        const umkmData = [
            { id: 1, name: 'Kopi Nusantara', category: 'Kuliner & Minuman', description: 'Biji kopi single origin terbaik dari pegunungan Jawa.', location: 'Ngadiluwih', rating: 5, imageUrl: 'https://placehold.co/400x300/FACC15/000?text=Kopi' },
            { id: 2, name: 'Batik Tulis Tradisional', category: 'Fesyen & Aksesori', description: 'Kain batik tulis premium dengan motif klasik kontemporer.', location: 'Pagu', rating: 4, imageUrl: 'https://placehold.co/400x300/FB7185/000?text=Batik' },
            { id: 3, name: 'Keripik Tempe Aneka Rasa', category: 'Kuliner & Minuman', description: 'Camilan keripik tempe renyah dengan rasa pedas manis.', location: 'Pare', rating: 4, imageUrl: 'https://placehold.co/400x300/4ade80/000?text=Keripik' },
            { id: 4, name: 'Jasa Desain Grafis Cepat', category: 'Jasa & Digital', description: 'Layanan desain logo dan materi promosi UMKM.', location: 'Mojo', rating: 5, imageUrl: 'https://placehold.co/400x300/3B82F6/000?text=Desain' },
            { id: 5, name: 'Tenun Ikat Sumba', category: 'Kriya & Kerajinan Tangan', description: 'Kain tenun ikat asli Sumba, 100% buatan tangan.', location: 'Semen', rating: 5, imageUrl: 'https://placehold.co/400x300/A78BFA/000?text=Tenun' },
            { id: 6, name: 'Rendang Kemasan Instan', category: 'Kuliner & Minuman', description: 'Rendang sapi siap saji, bumbu otentik Minang.', location: 'Mojoroto', rating: 5, imageUrl: 'https://placehold.co/400x300/EF4444/000?text=Rendang' },
            { id: 7, name: 'Aksesori Kulit Premium', category: 'Fesyen & Aksesori', description: 'Dompet dan tas kulit sapi kualitas ekspor.', location: 'Ngasem', rating: 4, imageUrl: 'https://placehold.co/400x300/F472B6/000?text=Kulit' },
            { id: 8, name: 'Madu Hutan Murni', category: 'Kuliner & Minuman', description: 'Madu asli dari hutan liar Kalimantan tanpa campuran.', location: 'Pesantren', rating: 5, imageUrl: 'https://placehold.co/400x300/6D28D9/000?text=Madu' },
        ];

        // Mendapatkan elemen daftar UMKM
        const umkmListContainer = document.getElementById('umkm-list');
        const searchInput = document.getElementById('search-input');
        const categoryCards = document.querySelectorAll('.category-card'); // Mengambil semua elemen kartu kategori

        /**
         * Fungsi untuk menghasilkan HTML kartu UMKM.
         * @param {Object} umkm - Objek data UMKM.
         * @returns {string} - String HTML untuk kartu UMKM.
         */
        function createUmkmCard(umkm) {
            // Membuat ikon bintang berdasarkan rating
            const stars = '⭐'.repeat(umkm.rating) + '☆'.repeat(5 - umkm.rating);
            
            // Membuat nama file dari nama UMKM: lowercase, ganti spasi dengan strip, tambahkan .html
            const fileName = umkm.name.toLowerCase().replace(/\s+/g, '-') + '.html';
            
            return `
                <div class="umkm-card bg-white rounded-xl shadow-lg overflow-hidden transition duration-300 hover:shadow-xl transform hover:-translate-y-0.5" 
                     data-name="${umkm.name.toLowerCase()}" 
                     data-category="${umkm.category.toLowerCase()}" 
                     data-location="${umkm.location.toLowerCase()}">
                    
                    <img src="${umkm.imageUrl}" alt="Gambar ${umkm.name}" onerror="this.onerror=null;this.src='https://placehold.co/400x300/cccccc/333333?text=UMKM+Placeholder';" class="w-full h-48 object-cover">
                    
                    <div class="p-6">
                        <span class="inline-block text-xs font-semibold px-3 py-1 rounded-full text-primary bg-primary/20 mb-3">${umkm.category.split(' ')[0]}</span>
                        <h3 class="text-xl font-bold mb-2 truncate">${umkm.name}</h3>
                        <p class="text-sm text-gray-500 mb-4 h-10 overflow-hidden">${umkm.description}</p>
                        
                        <div class="flex justify-between items-center mb-4">
                            <div class="text-sm font-medium text-gray-600 flex items-center">
                                <svg class="w-4 h-4 mr-1 text-primary" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"></path></svg>
                                ${umkm.location}
                            </div>
                            <span class="text-yellow-500 text-sm">${stars}</span>
                        </div>
                        
                        <a href="produk/${fileName}" class="block w-full text-center bg-primary text-white py-2 rounded-full text-sm font-semibold hover:bg-primary-dark transition duration-300">
                            Lihat Detail
                        </a>
                    </div>
                </div>
            `;
        }

        /**
         * Fungsi untuk merender daftar UMKM ke DOM.
         * @param {Array} data - Array data UMKM yang akan ditampilkan.
         */
        function renderUmkmList(data) {
            umkmListContainer.innerHTML = data.map(createUmkmCard).join('');
        }

        /**
         * Fungsi untuk memfilter daftar UMKM berdasarkan input pencarian.
         */
        function filterUmkm() {
            const query = searchInput.value.toLowerCase().trim();
            const filteredData = umkmData.filter(umkm => 
                umkm.name.toLowerCase().includes(query) || 
                umkm.description.toLowerCase().includes(query) ||
                umkm.category.toLowerCase().includes(query) ||
                umkm.location.toLowerCase().includes(query)
            );
            renderUmkmList(filteredData);
            // Nonaktifkan styling aktif pada kartu kategori saat melakukan pencarian manual
            categoryCards.forEach(card => card.classList.remove('active'));
        }

        /**
         * Fungsi untuk memfilter daftar UMKM berdasarkan kategori yang dipilih.
         * @param {string} selectedCategory - Kategori yang dipilih (misal: "Kuliner & Minuman").
         */
        function filterByCategory(selectedCategory) {
            let filteredData;
            if (selectedCategory === 'all') {
                filteredData = umkmData;
            } else {
                filteredData = umkmData.filter(umkm => 
                    umkm.category === selectedCategory
                );
            }
            renderUmkmList(filteredData);
            // Kosongkan input pencarian saat memfilter berdasarkan kategori
            searchInput.value = '';

            // Update kelas 'active' pada kartu kategori
            categoryCards.forEach(card => {
                if (card.dataset.category === selectedCategory) {
                    card.classList.add('active');
                } else {
                    card.classList.remove('active');
                }
            });
            // Gulir ke bagian produk unggulan setelah filter
            document.querySelector('#unggulan').scrollIntoView({ behavior: 'smooth' });
        }


        // Tampilkan semua data UMKM saat pertama kali dimuat
        document.addEventListener('DOMContentLoaded', () => {
            renderUmkmList(umkmData);

            // Logic untuk tombol menu mobile
            const mobileMenuButton = document.getElementById('mobile-menu-button');
            const mobileMenu = document.getElementById('mobile-menu');

            mobileMenuButton.addEventListener('click', () => {
                mobileMenu.classList.toggle('hidden');
            });
            
            // Tutup menu saat link diklik (untuk navigasi yang smooth)
            mobileMenu.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    mobileMenu.classList.add('hidden');
                });
            });

            // Tambahkan smooth scrolling untuk semua link anchor
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    document.querySelector(this.getAttribute('href')).scrollIntoView({
                        behavior: 'smooth'
                    });
                });
            });

            // Tambahkan event listener untuk setiap kartu kategori
            categoryCards.forEach(card => {
                card.addEventListener('click', () => {
                    const category = card.dataset.category;
                    filterByCategory(category);
                });
            });

            // Set kategori "Lihat Semua Kategori" aktif secara default saat memuat halaman
            const allCategoryCard = document.querySelector('[data-category="all"]');
            if (allCategoryCard) {
                allCategoryCard.classList.add('active');
            }
        });

    // halaman kedua
    let currentSlide = 0;
const slider = document.getElementById("umkm-slider");
const totalSlides = slider.children.length;
const dots = document.querySelectorAll(".dot");

function updateSlider() {
    slider.style.transform = `translateX(-${currentSlide * 100}%)`;

    dots.forEach((dot, index) => {
        dot.style.background = index === currentSlide ? "#008080" : "#ccc";
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateSlider();
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateSlider();
}

// Auto-slide tiap 3 detik
setInterval(nextSlide, 3000);

updateSlider();

function sanitizeInput(str) {
    // Hilangkan tag HTML
    str = str.replace(/<[^>]*>/g, "");

    // Optional: hilangkan karakter berbahaya
    str = str.replace(/[&<>"'\/]/g, "");

    return str.trim();
}
