"use client";
import { useState, useRef, 
         useTransition } 
                         from "react";
import { createConsole } from "@/app/actions/console-actions";
import { useRouter }     from "next/navigation";
import PlusIconCustom    from "../icons/PlusIcon";

export default function AddForm() {
    const [errors, setErrors]          = useState<any>({});
    const [preview, setPreview]        = useState('/imgs/no-image.png');
    const [isPending, startTransition] = useTransition();
    const [showToast, setShowToast]    = useState(false);
    const fileInputRef                 = useRef<HTMLInputElement>(null);
    const router                       = useRouter();

    const [form, setForm] = useState({
        name:        "",
        releasedate: "",
        manufacturer:"",
        description: ""
    });

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleImageClick = (e: React.MouseEvent) => {
        e.preventDefault();  
        e.stopPropagation();     
        fileInputRef.current?.click();
    };

    const handleImageChange = (e: any) => {
        const file = e.target.files[0];

        if (file) {
            const url:any = URL.createObjectURL(file);
            setPreview(url);
        }
    };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setErrors({});

      const formData = new FormData(e.currentTarget);

      startTransition(async () => {
          const res = await createConsole(formData);

          if (res?.error) {
              setErrors(res.error);
          } else {
              setShowToast(true);
              setTimeout(() => {
                  router.push("/consoles");
              }, 3000);
          }
      });
  };
    //console.log(form)

    return (
            <div className="p-4 bg-base-200 min-h-screen">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold flex gap-2">
                        <PlusIconCustom size={32}/>
                        Add Console
                    </h1>
                </div>
                {/* - - - */}
                {showToast && (
                    <div className="toast toast-top toast-end">
                        <div className="alert alert-success">
                            <span>Console: <strong>{form.name}</strong> created successfully</span>
                        </div>
                    </div>
                )}
          <form
            onSubmit={handleSubmit}
            className="max-w-90 mx-auto space-y-4"
          >
            <fieldset disabled={showToast || isPending} className="contents">
              {/* Image - - - */}
              <div className="flex flex-col items-center">
                <div
                  onClick={handleImageClick}
                  className="cursor-pointer w-48 h-48 flex flex-col items-center justify-center hover:opacity-80 hover:scale-110 transition"
                >
                  <div className="avatar">
                      <div className="mask mask-squircle w-full">
                          <img
                              src={preview}
                              alt="Preview"
                              className="object-cover w-full h-full"
                          />
                      </div>
                  </div>
                  <span className="text-sm text-gray-500 text-center px-2">
                      Click to upload image
                  </span>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
                {errors.image && (
                  <small className="text-error mt-2">{errors.image[0]}</small>
                )}
              </div>
    
              {/* Name - - - */}
              <div>
                <label className="label">Name</label>
                <input name="name" className="input input-bordered w-full" value={form.name} onChange={handleChange} />
                {errors.name && <small className="text-error">{errors.name[0]}</small>}
              </div>
    
              {/* Date - - - */}
              <div>
                <label className="label">Release Date</label>
                <input type="date" name="releasedate" className="input input-bordered w-full" value={form.releasedate} onChange={handleChange} />
                {errors.releasedate && <small className="text-error">{errors.releasedate[0]}</small>}
              </div>
    
    
              {/* Manufacturer - - - */}
              <div>
                <label className="label">Manufacturer</label>
                <input name="manufacturer" className="input input-bordered w-full" value={form.manufacturer} onChange={handleChange} />
                {errors.manufacturer && <small className="text-error">{errors.manufacturer[0]}</small>}
              </div>
    
              {/* Description - - - */}
              <div>
                <label className="label">Description</label>
                <textarea name="description" className="textarea textarea-bordered w-full" value={form.description} onChange={handleChange} />
                {errors.description && <small className="text-error">{errors.description[0]}</small>}
              </div>

    
                {/* Button - - - */}
                <button
                  type="submit"
                  className="btn bg-purple-600 w-full mt-4 hover:bg-purple-800"
                  disabled={isPending || showToast}
                >
                  {(isPending || showToast) && (
                    <span className="loading loading-spinner loading-sm"></span>
                  )}
                  {isPending ? "Saving..." : showToast ? "Redirecting..." : "Create Console"}
                </button>
    
              </fieldset>
          </form>
            </div>
        );
}