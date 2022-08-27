# Twilio

Twilio integration example:

```typescript
async function sendToDevice() {
  new Promise(async (resolve, reject) => {
    const data = {
      body: "Hi reza. i am kasra",
      to: ["+447702219932"],
    }

    await twilio.sms
      .message(data)
      .then((response) => resolve(response))
      .catch((err) => reject(err))
  })
}
```

&nbsp;

This integration covered this methods:

## sms

- [message]()

&nbsp;

### `Note:`

- Before use replace certificate in twilio/certificate.json
