import { HyperLink } from "../../ui/hyper-link/hyper-link";
import styles from "./thirdparty-license.module.css";

export const ThirdpartyLicense = ({name, version, license, text, homepage, repository}: {name: string, version: string, license: string, text: string, homepage: string | undefined, repository: string | undefined}) => {
  const url = homepage || repository;
  return (
    <>
      <dt className={styles.title}>{url ? <HyperLink href={url} openNew>{name}</HyperLink> : name} {version}</dt>
      <dd className={styles.description}>
        <span className={styles.licenseType}>{license}</span>
        <pre className={styles.licenseText}>
          {text}
        </pre>
      </dd>
    </>
  );
};
