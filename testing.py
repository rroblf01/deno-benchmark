import requests
import time

start_url = 'http://localhost:8787/init'
urls = [
    'http://localhost:8787/postgres',
    'http://localhost:8787/denokv',
    'http://localhost:8787/redis'
]

def make_request(url):
    start = time.time()
    requests.get(url)
    end = time.time()
    return end - start

def benchmark_urls(urls, num_request=50000):
    requests.get(start_url)
    for url in urls:
        times = [make_request(url) for _ in range(num_request)]

        total_time = sum(times)
        average_time = total_time / len(times)
        
        print(f"URL: {url}")
        print(f"Tiempo total para {num_request} peticiones: {total_time:.2f} segundos")
        print(f"Tiempo promedio por petición: {average_time * 1000:.2f} milisegundos\n")

benchmark_urls(urls)
