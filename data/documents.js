/* ─── Document Corpus ────────────────────────────────────────────────────── */
/* Each document: { id, title, category, words (computed), content }         */

const DOCS = [
  {
    id: 0,
    title: "Introduction to Machine Learning",
    category: "AI",
    words: 0,
    content: `Machine learning is a branch of artificial intelligence that enables computers to learn from data without being explicitly programmed. Supervised learning involves training models on labeled datasets. Unsupervised learning discovers hidden patterns in unlabeled data. Reinforcement learning trains agents through rewards and penalties. Deep learning uses neural networks with many layers to learn complex representations. Gradient descent is the core optimization algorithm that minimizes loss functions during training. Feature engineering transforms raw data into meaningful representations for machine learning models.`
  },
  {
    id: 1,
    title: "Neural Networks and Deep Learning",
    category: "AI",
    words: 0,
    content: `Neural networks are computational models inspired by the human brain. A deep neural network consists of input layers, hidden layers, and output layers. Backpropagation is the algorithm used to train neural networks by computing gradients. Convolutional neural networks excel at image recognition tasks. Recurrent neural networks handle sequential data like text and time series. Transformer architectures use attention mechanisms and have revolutionized natural language processing. Dropout is a regularization technique that prevents overfitting in neural networks.`
  },
  {
    id: 2,
    title: "Data Structures and Algorithms",
    category: "CS",
    words: 0,
    content: `A trie is a tree data structure used to store strings where each node represents a character. Tries enable efficient prefix-based search and autocomplete functionality. Binary search trees allow fast lookup insertion and deletion operations. Hash tables provide constant time average case for search and insert. Graph algorithms like breadth first search and depth first search traverse connected structures. Dynamic programming solves complex problems by breaking them into overlapping subproblems. Sorting algorithms like quicksort and mergesort have efficient average time complexity.`
  },
  {
    id: 3,
    title: "Information Retrieval Systems",
    category: "IR",
    words: 0,
    content: `Information retrieval is the science of searching for documents within large collections. TF-IDF stands for term frequency inverse document frequency and measures word importance. An inverted index maps each word to the list of documents containing it enabling fast search. PageRank is an algorithm used by search engines to rank web pages by link importance. Boolean retrieval allows complex queries using AND OR and NOT operators. Query expansion improves recall by adding synonyms or related terms to the search query. Relevance feedback uses user judgments to iteratively improve search results.`
  },
  {
    id: 4,
    title: "Natural Language Processing",
    category: "AI",
    words: 0,
    content: `Natural language processing enables computers to understand and generate human language. Tokenization splits text into individual words or subword units called tokens. Stemming and lemmatization reduce words to their root forms for better matching. Named entity recognition identifies people places and organizations in text. Sentiment analysis classifies text as positive negative or neutral in opinion mining. Word embeddings like Word2Vec and GloVe represent words as dense numeric vectors. BERT and GPT are transformer based models that achieve state of the art results on language tasks.`
  },
  {
    id: 5,
    title: "Database Systems and SQL",
    category: "DB",
    words: 0,
    content: `A relational database stores data in tables with rows and columns linked by foreign keys. SQL is the standard language for querying and manipulating relational databases. Indexes speed up database queries by providing fast lookup paths to rows. Transactions ensure data integrity through ACID properties: atomicity consistency isolation durability. NoSQL databases like MongoDB and Redis offer flexible schema and horizontal scaling. Query optimization is the process of choosing the most efficient execution plan for a SQL statement. Normalization reduces data redundancy by organizing tables to minimize duplication.`
  },
  {
    id: 6,
    title: "Computer Vision and Image Processing",
    category: "AI",
    words: 0,
    content: `Computer vision enables machines to interpret and understand visual information from images. Convolutional neural networks are the foundation of modern image recognition systems. Object detection algorithms like YOLO and Faster RCNN locate and classify objects in images. Image segmentation partitions images into regions corresponding to different objects. Transfer learning allows models trained on large datasets to be fine tuned for specific tasks. Data augmentation artificially increases training set size through flips rotations and color jitter. Feature maps capture hierarchical visual patterns at different scales in convolutional networks.`
  },
  {
    id: 7,
    title: "Cybersecurity and Cryptography",
    category: "SEC",
    words: 0,
    content: `Cryptography is the science of securing information through mathematical algorithms. Symmetric encryption uses a single key for both encryption and decryption of data. Public key cryptography uses a pair of keys where the public key encrypts and private key decrypts. Hash functions convert data into fixed length digests used for integrity verification. SSL and TLS protocols secure internet communications by encrypting data in transit. A firewall monitors and controls incoming and outgoing network traffic based on security rules. Penetration testing simulates cyberattacks to discover vulnerabilities before attackers exploit them.`
  },
  {
    id: 8,
    title: "Cloud Computing and Distributed Systems",
    category: "CLOUD",
    words: 0,
    content: `Cloud computing delivers computing resources like servers storage and databases over the internet. Infrastructure as a service provides virtualized hardware resources on demand. Containerization with Docker and Kubernetes enables portable and scalable application deployment. Distributed systems coordinate multiple networked computers to work as a single coherent system. The CAP theorem states distributed systems can guarantee only two of consistency availability and partition tolerance. Microservices architecture decomposes applications into small independent services that communicate via APIs. Load balancing distributes incoming requests across multiple servers to prevent overload.`
  },
  {
    id: 9,
    title: "Operating Systems Fundamentals",
    category: "OS",
    words: 0,
    content: `An operating system manages hardware resources and provides services for application programs. Process scheduling determines which process runs on the CPU at any given time. Virtual memory allows programs to use more memory than physically available through disk paging. File systems organize and store data on persistent storage devices like hard drives. Deadlocks occur when processes wait indefinitely for resources held by each other. Semaphores and mutexes are synchronization primitives used to control concurrent access to shared resources. The kernel is the core component of an operating system that manages low level hardware interactions.`
  }
];
