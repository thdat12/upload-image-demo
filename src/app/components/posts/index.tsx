import useFile from "@/app/lib/file/useFile";
import { useContext, useEffect, useRef, useState } from "react";
import { PostContext } from "@/app/lib/context/postContext";

// components
import PostList from "./list";
import { Input } from "../ui/input";

import styles from "./styles.module.scss";

export default function Posts() {
  const { uploadFile } = useFile();
  const { posts, setPosts } = useContext(PostContext);

  const inputFileRef = useRef<HTMLInputElement>(null);

  const [file, setFile] = useState<File>();
  const [preview, setPreview] = useState<string | ArrayBuffer | null>();
  const [comment, setComment] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await fetch("/api/posts", {
      method: "GET",
    });
    if (!res.ok) {
      setPosts([]);
    }
    const { data } = await res.json();
    setPosts(data);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) return;
    if (posts?.length >= 5) {
      alert("Posts exceeds limit 5/5.");
      return;
    }

    try {
      const results = await uploadFile(file);

      const res = await fetch("/api/posts", {
        method: "POST",
        body: JSON.stringify({
          fileNm: results.data.fileNm,
          comment: comment,
        }),
      });

      if (!res.ok) {
        alert("Create a post failed");
      }

      handleResetForm();
      fetchData();
    } catch (error) {}
  };

  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (file.size > maxSize) {
      alert("File size exceeds 5MB limit.");
      return;
    }

    setFile(file);

    const reader = new FileReader();
    reader.onload = (finishedEvent: ProgressEvent<FileReader>) => {
      const { result } = finishedEvent.currentTarget as FileReader;
      setPreview(result);
    };
    reader.readAsDataURL(file);

    if (inputFileRef.current) {
      inputFileRef.current.value = "";
    }
  };

  const handleResetForm = () => {
    setFile(undefined);
    setPreview(undefined);
    setComment("");
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <form onSubmit={handleSubmit} className={styles.formWrapper}>
          {/* S - Form Header */}
          <div className={styles.formHeader}>
            <div className={styles.metaWrapper}>
              <picture>
                <img src={"/logo.png"} alt="Avatar" width={50} height={50} />
              </picture>
              <div className={styles.meta}>
                <span className="font-semibold">Qode.World</span>
                <Input
                  name="content"
                  type="text"
                  id="content"
                  placeholder="Enter..."
                  maxLength={200}
                  value={comment}
                  required
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setComment(e.target.value)
                  }
                />
              </div>
            </div>
          </div>
          {/* E - Form Header */}

          {/* S - Form Body */}
          <div className={styles.formBody}>
            <label htmlFor="file" className={styles.uploadImg}>
              {file ? (
                <></>
              ) : (
                <picture>
                  <img src="/plus.svg" alt="Plus" />
                </picture>
              )}
            </label>
            <input
              name="file"
              type="file"
              id="file"
              accept="image/jpg, image/png"
              hidden={true}
              onChange={handleChangeFile}
              ref={inputFileRef}
            />
            {preview && (
              <picture>
                <img
                  src={typeof preview === "string" ? preview : ""}
                  alt="Preview"
                  className={styles.previewImg}
                />
              </picture>
            )}
          </div>
          <div className={styles.helperTxt}>
            Max file size is 5M. Supported files are jpg, and png.
          </div>
          {/* E - Form Body */}

          {/* S - Form Footer */}
          <div className={styles.formFooter}>
            <input
              type="submit"
              value="Post"
              className={styles.submitBtn}
              disabled={!file}
            />
          </div>
          {/* E - Form Footer */}
        </form>

        {/* S - Uploaded Image List */}
        <div className={styles.listWrapper}>
          <PostList />
        </div>
        {/* E - Uploaded Image List */}
      </div>
    </div>
  );
}
