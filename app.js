// Section 1: Quiz Component
Vue.component('section-one', {
    template: `
        <div class="section">
            <h2>Section 1: Quiz</h2>
            <form @submit.prevent="submitQuiz">
                <!-- Radio button question -->
                <div class="mb-3">
                    <p>{{ radioQuestion }}</p>
                    <div v-for="option in radioOptions" :key="option">
                        <div class="form-check">
                            <input class="form-check-input" type="radio" :id="option" :value="option" v-model="radioAnswer">
                            <label class="form-check-label" :for="option">{{ option }}</label>
                        </div>
                    </div>
                </div>

                <!-- Dropdown question -->
                <div class="mb-3">
                    <p>{{ dropdownQuestion }}</p>
                    <select class="form-select" v-model="dropdownAnswer">
                        <option value="">Select an option</option>
                        <option v-for="option in dropdownOptions" :key="option" :value="option">{{ option }}</option>
                    </select>
                </div>

                <!-- Checkbox question -->
                <div class="mb-3">
                    <p>{{ checkboxQuestion }}</p>
                    <div v-for="option in checkboxOptions" :key="option">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" :id="option" :value="option" v-model="checkboxAnswers">
                            <label class="form-check-label" :for="option">{{ option }}</label>
                        </div>
                    </div>
                </div>

                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </div>
    `,
    data() {
        return {
            radioQuestion: 'What is your favorite color?',
            radioOptions: ['Red', 'Blue', 'Green', 'Yellow'],
            radioAnswer: '',
            dropdownQuestion: 'Which country would you like to visit?',
            dropdownOptions: ['France', 'Japan', 'Brazil', 'Australia'],
            dropdownAnswer: '',
            checkboxQuestion: 'Which programming languages do you know?',
            checkboxOptions: ['JavaScript', 'Python', 'Java', 'C++'],
            checkboxAnswers: []
        };
    },
    methods: {
        submitQuiz() {
            console.log('Quiz submitted:', {
                radioAnswer: this.radioAnswer,
                dropdownAnswer: this.dropdownAnswer,
                checkboxAnswers: this.checkboxAnswers
            });
            // Add your quiz submission logic here
        }
    }
});

// Section 2: TV Shows Component
Vue.component('section-two', {
    template: `
        <div class="section">
            <h2>Section 2: TV Shows</h2>
            <div class="accordion" id="tvShowsAccordion">
                <div class="accordion-item" v-for="(word, index) in randomWords" :key="word">
                    <h2 class="accordion-header" :id="'heading' + index">
                        <button class="accordion-button" type="button" data-bs-toggle="collapse" :data-bs-target="'#collapse' + index" :aria-expanded="index === 0" :aria-controls="'collapse' + index">
                            {{ word }}
                        </button>
                    </h2>
                    <div :id="'collapse' + index" class="accordion-collapse collapse" :class="{ show: index === 0 }" :aria-labelledby="'heading' + index" data-bs-parent="#tvShowsAccordion">
                        <div class="accordion-body">
                            <div v-if="tvShows[word]">
                                <div v-for="show in tvShows[word]" :key="show.id" class="mb-3">
                                    <h5>{{ show.name }}</h5>
                                    <p><strong>Type:</strong> {{ show.type }}</p>
                                    <p><strong>Summary:</strong> <span v-html="show.summary"></span></p>
                                    <p><strong>Link:</strong> <a :href="show.url" target="_blank">{{ show.url }}</a></p>
                                </div>
                            </div>
                            <div v-else>
                                Loading...
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
    data() {
        return {
            randomWords: ['cars', 'space', 'nature', 'technology'],
            tvShows: {}
        };
    },
    mounted() {
        this.fetchTVShows();
    },
    methods: {
        async fetchTVShows() {
            for (const word of this.randomWords) {
                try {
                    const response = await fetch(`http://api.tvmaze.com/search/shows?q=${word}`);
                    const data = await response.json();
                    this.tvShows[word] = data.slice(0, 3).map(item => item.show);
                } catch (error) {
                    console.error(`Error fetching TV shows for "${word}":`, error);
                }
            }
        }
    }
});

// Section 3: Additional Content Component
Vue.component('section-three', {
    template: `
        <div class="section">
            <h2>Section 3: Additional Content</h2>
            <p>This is a placeholder for Section 3. Add your content here based on the Figma design.</p>
        </div>
    `
});

// Initialize Vue app
new Vue({
    el: '#app'
});