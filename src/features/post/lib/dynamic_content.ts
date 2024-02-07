import {PostPicture} from "@/services/api/gen";

const IMAGE_PATTERN = /<img[^>]*src="([^"]+)"[^>]*>/g;

export const transformHtmlContent = (
  content: string,
  pictures: PostPicture[]
) => {
  const replaceImageSrc = (match: string, attribute: string) => {
    const matches = match.match(new RegExp(`${attribute}="([^"]+)"`));
    const src = matches ? matches[1] : "";
    const placeholder =
      pictures.find(
        (picture) => new URL(picture.url!).pathname === new URL(src).pathname
      )?.placeholder ?? "";
    return match.replace(
      new RegExp(`${attribute}="([^"]+)"`),
      `${attribute}="{{${placeholder}}}"`
    );
  };

  return content.replace(IMAGE_PATTERN, (match) => {
    if (match.includes("src")) {
      // Handle direct URL images
      match = replaceImageSrc(match, "src");
    }
    if (match.includes("data-mce-src")) {
      // Handle images with data-mce-src attribute
      match = replaceImageSrc(match, "data-mce-src");
    }
    return match;
  });
};

const html = `<h1>✨ Announcing Blogify</h1><p><strong>Blogify</strong> is a pretty app that we made:) 🌟</p><p><br data-mce-bogus="1"></p><h3>Some changes heh 🏓</h3><p><br data-mce-bogus="1"></p><p><img src="https://preprod-bucket-blogify-api-bucket-anz3f9vbsqit.s3.eu-west-3.amazonaws.com/TjkIMthvRbbvQxiFU7cmk.png?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBUaCWV1LXdlc3QtMyJIMEYCIQDpRZNP5y7i19fDjhg9yVQLvD45gWzxixk2Abe%2FtWCSngIhAJhNy%2FQjUAW4EuRjNrSANjG9AHM1VrCEw5bUil2zOeK4Ks4DCN3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMMDU4MjY0NTU5MDI5IgwgZzEFHy8uyV%2B9V%2FMqogMyKzKTOa1KqMV6DfPgqgk5BgUhQORYayP9fNGCjWp0X7MFN2cdMAXExaRiRa6uaOtXYqKEd4KEemCJnYM2U41mRSFICIAJzcLFzq0slehf1xdr%2BcxnHSljvP%2Fyklw%2FSJovYd5W%2FMYHxNZW6NK2OptEyDWSbvpLuZ%2BqquB9K5BlpIhJgPp0%2FqZFm8Z6EustGjl7SmRm0ZwDdYWXlXinm832770LVPpyPROXNANyuvFc6ye0OM5VRhCU8Q0Q6QfR4sfko8BkzmwFLQ85GkxGsdyXOq7MYSZSOYK50o7BJXLbKS6ITSlQvKSydEJx7ZlHSLa4yd1zx9Arm3O28IlINICv%2FQlzDf0JKEd8QWZey3YbnBq7rMJUq%2B%2Fe4WU9QQRjEEqB5iYh1twcW2eFjlUFL%2BAvu81D8vT4bVfkD313%2FU2ln%2FqdJjmn9CLIGWUKyx8m2HjXrtBZ6ZJVHZ4P4S6WX%2BQlOnO7%2FMF0eRn71t0bMpFEHKA5%2FXWVP92rjbMiW%2BobD1%2B0Clzo%2FuMdxFqSA%2FK3G%2Bnm91mWxFqCO2VCHAGAvElF0MyxMJ7Mj64GOp0BYGI%2BCQ1przz8qKL3BicHjdHweZrjCyjhsoIvnB6HijuE99SI7WtCTK2QZuH3xpd2YpI%2BTv0MG%2FTZHhO5o%2BkZYHMrOd8C5gE6RxqrT2q%2BPjVY1okbaybqKE5E5PnvRHfhdWO%2FParbU2M%2FJlYysG455U%2B5REIVtsLUtVIIubPr5l4GjMxhjrwAkYxuKJDkMjvXkdgY2zGPcSDzZjL61Q%3D%3D&amp;X-Amz-Algorithm=AWS4-HMAC-SHA256&amp;X-Amz-Date=20240207T203726Z&amp;X-Amz-SignedHeaders=host&amp;X-Amz-Credential=ASIAQ3EGWTW2ZVAVUOIY%2F20240207%2Feu-west-3%2Fs3%2Faws4_request&amp;X-Amz-Expires=120&amp;X-Amz-Signature=d22e7c0b64ef7197bef1ccd5617f9c953d654d700ce38a4fcf433e5d5cefb6a0" data-mce-src="https://preprod-bucket-blogify-api-bucket-anz3f9vbsqit.s3.eu-west-3.amazonaws.com/TjkIMthvRbbvQxiFU7cmk.png?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBUaCWV1LXdlc3QtMyJIMEYCIQDpRZNP5y7i19fDjhg9yVQLvD45gWzxixk2Abe%2FtWCSngIhAJhNy%2FQjUAW4EuRjNrSANjG9AHM1VrCEw5bUil2zOeK4Ks4DCN3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMMDU4MjY0NTU5MDI5IgwgZzEFHy8uyV%2B9V%2FMqogMyKzKTOa1KqMV6DfPgqgk5BgUhQORYayP9fNGCjWp0X7MFN2cdMAXExaRiRa6uaOtXYqKEd4KEemCJnYM2U41mRSFICIAJzcLFzq0slehf1xdr%2BcxnHSljvP%2Fyklw%2FSJovYd5W%2FMYHxNZW6NK2OptEyDWSbvpLuZ%2BqquB9K5BlpIhJgPp0%2FqZFm8Z6EustGjl7SmRm0ZwDdYWXlXinm832770LVPpyPROXNANyuvFc6ye0OM5VRhCU8Q0Q6QfR4sfko8BkzmwFLQ85GkxGsdyXOq7MYSZSOYK50o7BJXLbKS6ITSlQvKSydEJx7ZlHSLa4yd1zx9Arm3O28IlINICv%2FQlzDf0JKEd8QWZey3YbnBq7rMJUq%2B%2Fe4WU9QQRjEEqB5iYh1twcW2eFjlUFL%2BAvu81D8vT4bVfkD313%2FU2ln%2FqdJjmn9CLIGWUKyx8m2HjXrtBZ6ZJVHZ4P4S6WX%2BQlOnO7%2FMF0eRn71t0bMpFEHKA5%2FXWVP92rjbMiW%2BobD1%2B0Clzo%2FuMdxFqSA%2FK3G%2Bnm91mWxFqCO2VCHAGAvElF0MyxMJ7Mj64GOp0BYGI%2BCQ1przz8qKL3BicHjdHweZrjCyjhsoIvnB6HijuE99SI7WtCTK2QZuH3xpd2YpI%2BTv0MG%2FTZHhO5o%2BkZYHMrOd8C5gE6RxqrT2q%2BPjVY1okbaybqKE5E5PnvRHfhdWO%2FParbU2M%2FJlYysG455U%2B5REIVtsLUtVIIubPr5l4GjMxhjrwAkYxuKJDkMjvXkdgY2zGPcSDzZjL61Q%3D%3D&amp;X-Amz-Algorithm=AWS4-HMAC-SHA256&amp;X-Amz-Date=20240207T203726Z&amp;X-Amz-SignedHeaders=host&amp;X-Amz-Credential=ASIAQ3EGWTW2ZVAVUOIY%2F20240207%2Feu-west-3%2Fs3%2Faws4_request&amp;X-Amz-Expires=120&amp;X-Amz-Signature=d22e7c0b64ef7197bef1ccd5617f9c953d654d700ce38a4fcf433e5d5cefb6a0"></p>`;
const res = transformHtmlContent(html, [
  {
    id: "TjkIMthvRbbvQxiFU7cmk",
    post_id: "TmNQDlrqCRrn8TuFpgIDd",
    placeholder: "TjkIMthvRbbvQxiFU7cmk",
    url: "https://preprod-bucket-blogify-api-bucket-anz3f9vbsqit.s3.eu-west-3.amazonaws.com/TjkIMthvRbbvQxiFU7cmk.png?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBUaCWV1LXdlc3QtMyJIMEYCIQDpRZNP5y7i19fDjhg9yVQLvD45gWzxixk2Abe%2FtWCSngIhAJhNy%2FQjUAW4EuRjNrSANjG9AHM1VrCEw5bUil2zOeK4Ks4DCN3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMMDU4MjY0NTU5MDI5IgwgZzEFHy8uyV%2B9V%2FMqogMyKzKTOa1KqMV6DfPgqgk5BgUhQORYayP9fNGCjWp0X7MFN2cdMAXExaRiRa6uaOtXYqKEd4KEemCJnYM2U41mRSFICIAJzcLFzq0slehf1xdr%2BcxnHSljvP%2Fyklw%2FSJovYd5W%2FMYHxNZW6NK2OptEyDWSbvpLuZ%2BqquB9K5BlpIhJgPp0%2FqZFm8Z6EustGjl7SmRm0ZwDdYWXlXinm832770LVPpyPROXNANyuvFc6ye0OM5VRhCU8Q0Q6QfR4sfko8BkzmwFLQ85GkxGsdyXOq7MYSZSOYK50o7BJXLbKS6ITSlQvKSydEJx7ZlHSLa4yd1zx9Arm3O28IlINICv%2FQlzDf0JKEd8QWZey3YbnBq7rMJUq%2B%2Fe4WU9QQRjEEqB5iYh1twcW2eFjlUFL%2BAvu81D8vT4bVfkD313%2FU2ln%2FqdJjmn9CLIGWUKyx8m2HjXrtBZ6ZJVHZ4P4S6WX%2BQlOnO7%2FMF0eRn71t0bMpFEHKA5%2FXWVP92rjbMiW%2BobD1%2B0Clzo%2FuMdxFqSA%2FK3G%2Bnm91mWxFqCO2VCHAGAvElF0MyxMJ7Mj64GOp0BYGI%2BCQ1przz8qKL3BicHjdHweZrjCyjhsoIvnB6HijuE99SI7WtCTK2QZuH3xpd2YpI%2BTv0MG%2FTZHhO5o%2BkZYHMrOd8C5gE6RxqrT2q%2BPjVY1okbaybqKE5E5PnvRHfhdWO%2FParbU2M%2FJlYysG455U%2B5REIVtsLUtVIIubPr5l4GjMxhjrwAkYxuKJDkMjvXkdgY2zGPcSDzZjL61Q%3D%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20240207T203726Z&X-Amz-SignedHeaders=host&X-Amz-Credential=ASIAQ3EGWTW2ZVAVUOIY%2F20240207%2Feu-west-3%2Fs3%2Faws4_request&X-Amz-Expires=120&X-Amz-Signature=d22e7c0b64ef7197bef1ccd5617f9c953d654d700ce38a4fcf433e5d5cefb6a0",
  },
]);

console.log(res);
