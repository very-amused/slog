[@very-amused/slog](../README.md) / [Exports](../modules.md) / SlogClient

# Class: SlogClient

An Slog client instance, used to send logs to a destination server.

## Table of contents

### Constructors

- [constructor](SlogClient.md#constructor)

### Properties

- [serverURL](SlogClient.md#serverurl)
- [DefaultPort](SlogClient.md#defaultport)

### Methods

- [debug](SlogClient.md#debug)
- [error](SlogClient.md#error)
- [log](SlogClient.md#log)
- [warn](SlogClient.md#warn)

## Constructors

### constructor

• **new SlogClient**(`serverURL`)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `serverURL` | \`https://${string}:${number}\` | The destination server URL. Must use HTTPS and provide a domain and port. |

#### Defined in

[src/client/client.ts:12](https://github.com/very-amused/slog/blob/61064cf/src/client/client.ts#L12)

## Properties

### serverURL

• `Readonly` **serverURL**: `string`

#### Defined in

[src/client/client.ts:5](https://github.com/very-amused/slog/blob/61064cf/src/client/client.ts#L5)

___

### DefaultPort

▪ `Static` `Readonly` **DefaultPort**: ``4040``

The default port used for Slog communication.

#### Defined in

[src/client/client.ts:7](https://github.com/very-amused/slog/blob/61064cf/src/client/client.ts#L7)

## Methods

### debug

▸ **debug**(`message`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | `unknown` |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/client/client.ts:48](https://github.com/very-amused/slog/blob/61064cf/src/client/client.ts#L48)

___

### error

▸ **error**(`message`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | `unknown` |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/client/client.ts:44](https://github.com/very-amused/slog/blob/61064cf/src/client/client.ts#L44)

___

### log

▸ **log**(`message`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | `unknown` |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/client/client.ts:36](https://github.com/very-amused/slog/blob/61064cf/src/client/client.ts#L36)

___

### warn

▸ **warn**(`message`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | `unknown` |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/client/client.ts:40](https://github.com/very-amused/slog/blob/61064cf/src/client/client.ts#L40)
