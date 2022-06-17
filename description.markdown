User Api

## Websocket

**HOST**: `http://localhost:4000`

---

###Listen for join in room

---

Event: `join-in-room`

Data:
Property | Description |
|-------------|---------------------|
| `token` |  Auth token of user|
| `time`  | Time of login |
| `id` | Id of room |


Example:
```angular2html
token: sfasf-afas
time: 2022-09-23
id: adsfadsdf-dfsf
```
---

###Listen for join in chat

---

Event: `join-in-chat`

Data:
Property | Description |
|-------------|---------------------|
| `token` |  Auth token of user|
| `time`  | Time of login |
| `id` | Id of chat |