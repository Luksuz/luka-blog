import "bootstrap/dist/css/bootstrap.min.css"

export default function Content({ title, subtitle1, content1, subtitle2, content2, subtitle3, content3, subtitle4, content4, subtitle5, content5, createdAt }) {
    return (
      <>
        <h1>{title}</h1>
        <p className="text-end">Posted {createdAt}</p>
        <hr className="" />
        <h3 className="my-4">{subtitle1}</h3>
        <p>
          {content1}
        </p>
        <h3 className="">{subtitle2}</h3>
        <p>
          {content2}
        </p>
        <h3 className="">{subtitle3}</h3>
        <p>
          {content3}
        </p>
        <h3 className="">{subtitle4}</h3>
        <p>
          {content4}
        </p>
        <h3 className="">{subtitle5}</h3>
        <p>
          {content5}
        </p>

      </>
    );
  }
  