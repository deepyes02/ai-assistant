## OLLAMA WEB SERVER ## 

This project is a very simple solution to a very large problem. Basically, we are hooking up a User Interface to the already available robust service from Ollama. 

**see index.html line 76**
```html
<script>
makeThePostRequest('llama3.2', userQuery.value.trim())
</script>
```
The llama3.2 is a model openly available in ollama repo, pulled and used freely. 


So, hence these are the dependecies for this project : 
1. Ollama installed
2. Some chat compatible model pull and ready via ollama, for example
```bash
$ ollama ls
NAME               ID              SIZE      MODIFIED     
llama3.2:latest    a80c4f17acd5    2.0 GB    2 days ago      
qwen2.5:14b        7cdf5a0187d5    9.0 GB    2 weeks ago     
starcoder2:3b      f67ae0f64584    1.7 GB    2 months ago   
```

3. Ollama serve if not done already, and access the port number
```bash
$ ollama serve
Error: listen tcp 127.0.0.1:11434: bind: address already in use
```
(port 11434) or whatever is being used.
Update this value in server.js line 8
```js
const aiEndpoint = "http://127.0.0.1:11434/api/generate";
```

## Express server is used for quick route setup, but any server could be used. ##


