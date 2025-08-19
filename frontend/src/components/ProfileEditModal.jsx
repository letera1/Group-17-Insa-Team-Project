import { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateProfile, uploadAvatar } from "../lib/api";
import { LoaderIcon, MapPinIcon, ShuffleIcon, CameraIcon, UploadIcon, X } from "lucide-react";
import { LANGUAGES } from "../constants";
import { validatePassword } from "../lib/utils";
import PasswordStrengthIndicator from "./PasswordStrengthIndicator";

const ProfileEditModal = ({ isOpen, onClose, authUser }) => {
  const queryClient = useQueryClient();

  const [formState, setFormState] = useState({
    fullName: "",
    email: "",
    bio: "",
    nativeLanguage: "",
    learningLanguage: "",
    location: "",
    profilePic: "",
    currentPassword: "",
    newPassword: "",
  });

  const [uploading, setUploading] = useState(false);
  const [showPasswordFields, setShowPasswordFields] = useState(false);

  // Initialize form state when modal opens or authUser changes
  useEffect(() => {
    if (authUser && isOpen) {
      setFormState({
        fullName: authUser.fullName || "",
        email: authUser.email || "",
        bio: authUser.bio || "",
        nativeLanguage: authUser.nativeLanguage || "",
        learningLanguage: authUser.learningLanguage || "",
        location: authUser.location || "",
        profilePic: authUser.profilePic || "",
        currentPassword: "",
        newPassword: "",
      });
    }
  }, [authUser, isOpen]);

  const { mutate: updateProfileMutation, isPending } = useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      toast.success("Profile updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      onClose();
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to update profile");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate password if changing
    if (showPasswordFields) {
      if (!formState.currentPassword) {
        toast.error("Current password is required to change password");
        return;
      }
      if (!formState.newPassword) {
        toast.error("New password is required");
        return;
      }
      const { isValid } = validatePassword(formState.newPassword);
      if (!isValid) {
        toast.error("New password does not meet requirements");
        return;
      }
    }

    const updateData = {
      fullName: formState.fullName.trim(),
      email: formState.email.trim().toLowerCase(),
      bio: formState.bio.trim(),
      nativeLanguage: formState.nativeLanguage,
      learningLanguage: formState.learningLanguage,
      location: formState.location.trim(),
      profilePic: formState.profilePic,
    };

    // Add password fields only if user wants to change password
    if (showPasswordFields) {
      updateData.currentPassword = formState.currentPassword;
      updateData.newPassword = formState.newPassword;
    }

    updateProfileMutation(updateData);
  };

  const handleRandomAvatar = () => {
    const idx = Math.floor(Math.random() * 100) + 1;
    const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`;
    setFormState({ ...formState, profilePic: randomAvatar });
    toast.success("Random profile picture generated!");
  };

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    if (!/(png|jpe?g|webp)$/i.test(file.type)) {
      toast.error("Please select a PNG, JPG, or WEBP image");
      return;
    }
    
    if (file.size > 25 * 1024 * 1024) {
      toast.error("Image must be 25MB or smaller");
      return;
    }

    try {
      setUploading(true);
      const { url } = await uploadAvatar(file);
      setFormState({ ...formState, profilePic: url });
      toast.success("Profile photo uploaded");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to upload avatar");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  // Form validation
  const namePattern = /^[A-Za-z\s]+$/;
  const isNameValid = namePattern.test(formState.fullName) && formState.fullName.trim().length >= 2;
  const isEmailValid = /[^\s@]+@[^\s@]+\.[^\s@]+/.test(formState.email.trim());
  
  let isFormValid = isNameValid && isEmailValid;
  
  // If showing password fields, validate them too
  if (showPasswordFields) {
    const { isValid: isPasswordValid } = validatePassword(formState.newPassword);
    isFormValid = isFormValid && formState.currentPassword && isPasswordValid;
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-base-200 rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-4 sm:p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl sm:text-2xl font-bold">Edit Profile</h2>
            <button
              onClick={onClose}
              className="btn btn-ghost btn-sm btn-circle"
              aria-label="Close modal"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            {/* Profile Picture Section */}
            <div className="flex flex-col items-center space-y-4">
              <div className="size-24 sm:size-32 rounded-full bg-base-300 overflow-hidden">
                {formState.profilePic ? (
                  <img
                    src={formState.profilePic}
                    alt="Profile Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <CameraIcon className="size-8 sm:size-12 text-base-content opacity-40" />
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2 flex-wrap justify-center">
                <button 
                  type="button" 
                  onClick={handleRandomAvatar} 
                  className="btn btn-accent btn-sm sm:btn-md"
                >
                  <ShuffleIcon className="size-3 sm:size-4 mr-1 sm:mr-2" />
                  <span className="hidden sm:inline">Generate Random</span>
                  <span className="sm:hidden">Random</span>
                </button>
                <label className={`btn btn-secondary btn-sm sm:btn-md ${uploading ? "btn-disabled" : ""}`}>
                  <UploadIcon className="size-3 sm:size-4 mr-1 sm:mr-2" />
                  {uploading ? "Uploading..." : (
                    <>
                      <span className="hidden sm:inline">Upload from Gallery</span>
                      <span className="sm:hidden">Upload</span>
                    </>
                  )}
                  <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                </label>
              </div>
            </div>

            {/* Basic Information */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Full Name */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Full Name</span>
                </label>
                <input
                  type="text"
                  value={formState.fullName}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (/^[A-Za-z\s]*$/.test(value)) {
                      setFormState({ ...formState, fullName: value });
                    }
                  }}
                  className="input input-bordered w-full"
                  placeholder="Your full name"
                  required
                />
                {!isNameValid && formState.fullName && (
                  <p className="text-xs text-error mt-1">Name must be at least 2 characters and contain only letters</p>
                )}
              </div>

              {/* Email */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  className="input input-bordered w-full"
                  placeholder="your.email@example.com"
                  required
                />
                {!isEmailValid && formState.email && (
                  <p className="text-xs text-error mt-1">Please enter a valid email address</p>
                )}
              </div>
            </div>

            {/* Bio */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Bio</span>
              </label>
              <textarea
                value={formState.bio}
                onChange={(e) => setFormState({ ...formState, bio: e.target.value })}
                className="textarea textarea-bordered h-20 sm:h-24"
                placeholder="Tell others about yourself and your language learning goals"
              />
            </div>

            {/* Languages */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Native Language</span>
                </label>
                <select
                  value={formState.nativeLanguage}
                  onChange={(e) => setFormState({ ...formState, nativeLanguage: e.target.value })}
                  className="select select-bordered w-full"
                >
                  <option value="">Select your native language</option>
                  {LANGUAGES.map((lang) => (
                    <option key={`native-${lang}`} value={lang.toLowerCase()}>
                      {lang}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Learning Language</span>
                </label>
                <select
                  value={formState.learningLanguage}
                  onChange={(e) => setFormState({ ...formState, learningLanguage: e.target.value })}
                  className="select select-bordered w-full"
                >
                  <option value="">Select language you're learning</option>
                  {LANGUAGES.map((lang) => (
                    <option key={`learning-${lang}`} value={lang.toLowerCase()}>
                      {lang}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Location */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Location</span>
              </label>
              <div className="relative">
                <MapPinIcon className="absolute top-1/2 transform -translate-y-1/2 left-3 size-4 sm:size-5 text-base-content opacity-70" />
                <input
                  type="text"
                  value={formState.location}
                  onChange={(e) => setFormState({ ...formState, location: e.target.value })}
                  className="input input-bordered w-full pl-10"
                  placeholder="City, Country"
                />
              </div>
            </div>

            {/* Password Change Section */}
            <div className="form-control">
              <label className="label cursor-pointer justify-start gap-2">
                <input
                  type="checkbox"
                  className="checkbox checkbox-sm"
                  checked={showPasswordFields}
                  onChange={(e) => {
                    setShowPasswordFields(e.target.checked);
                    if (!e.target.checked) {
                      setFormState({
                        ...formState,
                        currentPassword: "",
                        newPassword: "",
                      });
                    }
                  }}
                />
                <span className="text-sm">Change Password</span>
              </label>
            </div>

            {showPasswordFields && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Current Password</span>
                  </label>
                  <input
                    type="password"
                    value={formState.currentPassword}
                    onChange={(e) => setFormState({ ...formState, currentPassword: e.target.value })}
                    className="input input-bordered w-full"
                    placeholder="Enter current password"
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">New Password</span>
                  </label>
                  <input
                    type="password"
                    value={formState.newPassword}
                    onChange={(e) => setFormState({ ...formState, newPassword: e.target.value })}
                    className="input input-bordered w-full"
                    placeholder="Enter new password"
                  />
                  {formState.newPassword && (
                    <div className="mt-2">
                      <PasswordStrengthIndicator password={formState.newPassword} />
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="btn btn-ghost w-full sm:w-auto order-2 sm:order-1"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary w-full sm:flex-1 order-1 sm:order-2"
                disabled={!isFormValid || isPending}
              >
                {isPending ? (
                  <>
                    <LoaderIcon className="animate-spin size-4 mr-2" />
                    Updating...
                  </>
                ) : (
                  "Save Changes"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileEditModal;
