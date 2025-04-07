# Exercise 13.2
# Create a blogs table

CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    author text,
    url text NOT NULL,
    title text NOT NULL,
    likes integer DEFAULT 0
);

# Add two blogs to the database
insert into blogs (author, url, title) values ('Koray Kavukcuoglu', 'https://blog.google/technology/google-deepmind/gemini-model-thinking-updates-march-2025/?utm_source=deepmind.google&utm_medium=referral&utm_campaign=gdm&utm_content=', 'Gemini 2.5: Our most intelligent AI model');
insert into blogs (author, url, title) values ('Subhashini Venugopalan', 'https://research.google/blog/evaluating-progress-of-llms-on-scientific-problem-solving/', 'Evaluating progress of LLMs on scientific problem-solving');