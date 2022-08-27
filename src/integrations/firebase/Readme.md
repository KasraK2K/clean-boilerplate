# Firebase

Firebase integration example:

```typescript
async function sendToDevice() {
  new Promise(async (resolve, reject) => {
    const registrationTokenOrTokens: string | string[] = ""
    const data: DataMessagePayload = {}
    const notification: NotificationMessagePayload = {}
    const payload: MessagingPayload = { data, notification }
    const options: MessagingOptions = {
      priority: "high",
      timeToLive: 60 * 60 * 24,
    }

    await firebase.messaging
      .sendToDevice(registrationTokenOrTokens, payload, options)
      .then((response) => resolve(response))
      .catch((err) => reject(err))
  })
}
```

&nbsp;

This integration covered this methods:

## messaging

- [sendToDevice]()

&nbsp;

### `Note:`

- Before use replace certificate in firebase/certificate.json
