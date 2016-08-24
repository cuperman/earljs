# Earl.js

URL helpers

## serial

Serialize and encode an Object in URL format

Examples:

```javascript
earl.serial({foo: "bar", dis: "dat"});
// => "foo=bar&dis=dat"
```

## deserial

Deserialize and decode a string from URL format

Examples:

```javascript
earl.deserial("foo=bar&dis=dat");
// => Object {foo: "bar", dis: "dat"}
```

## hash

Get and set key/values in location.hash

Examples:

```javascript
location.hash = "#foo=bar&dis=dat";
earl.hash();
// => Object {foo: "bar", dis: "dat"}

earl.hash("foo");
// => "bar"

earl.hash("foo", "baz");
// => true
location.hash;
// => "#foo=baz&dis=dat"

earl.hash({foo: "FOO", bar: "BAR"});
// => true
location.hash;
//=> "#foo=FOO&bar=BAR&dis=dat"
```

## rmhash

Remove key/values from location.hash

```javascript
location.hash = "#foo=bar&dis=dat";
earl.rmhash("foo");
// => "bar"
location.hash;
// => "#dis=dat"

earl.rmhash();
// => Object {dis: "dat"}
location.hash;
// => "#"
```
